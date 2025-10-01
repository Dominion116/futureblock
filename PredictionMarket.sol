// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title AggregatorV3Interface
 * @dev Interface for the Chainlink V3 data feed aggregator.
 */
interface AggregatorV3Interface {
  function decimals() external view returns (uint8);

  function description() external view returns (string memory);

  function version() external view returns (uint256);

  function getRoundData(uint80 _roundId)
    external
    view
    returns (
      uint80 roundId,
      int256 answer,
      uint256 startedAt,
      uint256 updatedAt,
      uint80 answeredInRound
    );

  function latestRoundData()
    external
    view
    returns (
      uint80 roundId,
      int256 answer,
      uint256 startedAt,
      uint256 updatedAt,
      uint80 answeredInRound
    );
}

/**
 * @title PredictionMarket
 * @dev A simple prediction market contract using a commit-reveal scheme.
 */
contract PredictionMarket {
    enum PredictionChoice {
        High,
        Low
    }

    enum PredictionResult {
        Pending,
        Won,
        Lost
    }

    struct Prediction {
        address token;
        uint256 predictedPrice;
        uint256 targetTimestamp;
        PredictionChoice choice;
        PredictionResult result;
        bool revealed;
    }

    mapping(address => bytes32) public commitments;
    mapping(bytes32 => Prediction) public predictions;

    event PredictionCommitted(address indexed user, bytes32 commitment);
    event PredictionRevealed(
        address indexed user,
        address indexed token,
        uint256 predictedPrice,
        PredictionChoice choice,
        uint256 targetTimestamp
    );
    event PredictionOutcome(bytes32 indexed commitment, PredictionResult result);

    /**
     * @dev Commits a prediction.
     * @param _commitment A hash of the prediction details and a salt.
     */
    function commit(bytes32 _commitment) public {
        require(commitments[msg.sender] == 0, "Commitment already exists");
        commitments[msg.sender] = _commitment;
        emit PredictionCommitted(msg.sender, _commitment);
    }

    /**
     * @dev Reveals a prediction.
     * @param _token The token address for the prediction.
     * @param _predictedPrice The predicted price of the token.
     * @param _choice The user's prediction choice (High or Low).
     * @param _targetTimestamp The timestamp for the prediction.
     * @param _salt A random salt to prevent hash collisions.
     */
    function reveal(
        address _token,
        uint256 _predictedPrice,
        PredictionChoice _choice,
        uint256 _targetTimestamp,
        bytes32 _salt
    ) public {
        bytes32 commitment = commitments[msg.sender];
        require(commitment != 0, "No commitment found");

        bytes32 calculatedCommitment = keccak256(
            abi.encodePacked(
                msg.sender,
                _token,
                _predictedPrice,
                _choice,
                _targetTimestamp,
                _salt
            )
        );

        require(
            commitment == calculatedCommitment,
            "Calculated commitment does not match stored commitment"
        );

        predictions[commitment] = Prediction({
            token: _token,
            predictedPrice: _predictedPrice,
            targetTimestamp: _targetTimestamp,
            choice: _choice,
            result: PredictionResult.Pending,
            revealed: true
        });

        delete commitments[msg.sender];

        emit PredictionRevealed(
            msg.sender,
            _token,
            _predictedPrice,
            _choice,
            _targetTimestamp
        );
    }

    /**
     * @dev Checks the price and determines the winner.
     * @param _commitment The commitment of the prediction to check.
     * @param _priceFeed The address of the Chainlink price feed.
     */
    function checkPrice(bytes32 _commitment, address _priceFeed) public {
        Prediction storage prediction = predictions[_commitment];
        require(prediction.revealed, "Prediction not revealed");
        require(
            block.timestamp > prediction.targetTimestamp + 24 hours,
            "Prediction window not over"
        );
        require(
            prediction.result == PredictionResult.Pending,
            "Prediction already resolved"
        );

        AggregatorV3Interface priceFeed = AggregatorV3Interface(_priceFeed);
        (, int256 price, , , ) = priceFeed.latestRoundData();

        uint256 currentPrice = uint256(price);

        if (prediction.choice == PredictionChoice.High) {
            if (currentPrice > prediction.predictedPrice) {
                prediction.result = PredictionResult.Won;
            } else {
                prediction.result = PredictionResult.Lost;
            }
        } else {
            if (currentPrice < prediction.predictedPrice) {
                prediction.result = PredictionResult.Won;
            } else {
                prediction.result = PredictionResult.Lost;
            }
        }

        emit PredictionOutcome(_commitment, prediction.result);
    }
}
