// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

interface IERC20 {
  function transferFrom(address from, address to, uint256 value) external returns (bool);
}

/// @title T3PaymentGateway - Accepts ERC20 stablecoin or native payments; emits event with usage tag
contract T3PaymentGateway {
  address public immutable treasury;
  mapping(address => bool) public isAllowedToken;

  event Paid(address indexed payer, address indexed token, uint256 amount, bytes32 usageTag);

  constructor(address _treasury, address[] memory tokens) {
    require(_treasury != address(0), "treasury");
    treasury = _treasury;
    for (uint i; i < tokens.length; i++) {
      isAllowedToken[tokens[i]] = true;
    }
  }

  function setToken(address token, bool allowed) external {
    require(msg.sender == treasury, "only treasury");
    isAllowedToken[token] = allowed;
  }

  function payERC20(address token, uint256 amount, bytes32 usageTag) external {
    require(isAllowedToken[token], "token not allowed");
    require(IERC20(token).transferFrom(msg.sender, treasury, amount), "transfer failed");
    emit Paid(msg.sender, token, amount, usageTag);
  }

  function payNative(bytes32 usageTag) external payable {
    (bool ok,) = payable(treasury).call{value: msg.value}("");
    require(ok, "native transfer failed");
    emit Paid(msg.sender, address(0), msg.value, usageTag);
  }
}
