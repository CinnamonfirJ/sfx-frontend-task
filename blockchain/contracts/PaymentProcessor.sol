// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
}

contract PaymentProcessor {
    IERC20 public immutable token;
    uint256 public transactionCount;

    struct Transaction {
        uint256 id;
        uint256 timestamp;
        address sender;
        address recipient;
        uint256 amount;
        string message;
    }

    mapping(uint256 => Transaction) public transactions;
    mapping(address => uint256[]) public userTransactions;

    event PaymentSent(
        uint256 indexed id,
        address indexed from,
        address indexed to,
        uint256 amount,
        string message,
        uint256 timestamp
    );

    constructor(address _tokenAddress) {
        require(_tokenAddress != address(0), "Invalid token address");
        token = IERC20(_tokenAddress);
    }

    function sendPayment(address _recipient, uint256 _amount, string memory _message) external {
        require(_recipient != address(0), "Recipient cannot be the zero address");
        require(_amount > 0, "Amount must be greater than zero");
        
        uint256 allowed = token.allowance(msg.sender, address(this));
        require(allowed >= _amount, "Check allowance: Not enough tokens approved");

        bool success = token.transferFrom(msg.sender, _recipient, _amount);
        require(success, "ERC20 transfer failed");

        transactionCount++;
        uint256 newId = transactionCount;
        
        transactions[newId] = Transaction({
            id: newId,
            timestamp: block.timestamp,
            sender: msg.sender,
            recipient: _recipient,
            amount: _amount,
            message: _message
        });

        userTransactions[msg.sender].push(newId);
        userTransactions[_recipient].push(newId);

        emit PaymentSent(newId, msg.sender, _recipient, _amount, _message, block.timestamp);
    }

    function getTransactionIdsForUser(address _user) public view returns (uint256[] memory) {
        return userTransactions[_user];
    }

    function getTransactionCountForUser(address _user) public view returns (uint256) {
        return userTransactions[_user].length;
    }
}
