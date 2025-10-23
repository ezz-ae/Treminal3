// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @dev Minimal ERC20 interface for demonstration. Use OpenZeppelin in production.
interface IERC20Mint {
  function initialize(string memory name_, string memory symbol_, uint8 decimals_, uint256 initialSupply_, address owner_) external;
}

contract T3TokenFactory {
  address public immutable feeReceiver;
  uint256 public immutable flatFeeWei;
  event Launched(address indexed owner, address token, string name, string symbol, uint256 supply);

  constructor(address _feeReceiver, uint256 _flatFeeWei) {
    require(_feeReceiver != address(0), "feeReceiver");
    feeReceiver = _feeReceiver; flatFeeWei = _flatFeeWei;
  }

  function launchBasic(address erc20Implementation, string memory name, string memory symbol, uint8 decimals, uint256 supply) external payable {
    require(msg.value >= flatFeeWei, "fee");
    (bool ok,) = payable(feeReceiver).call{value: flatFeeWei}(""); require(ok, "fee xfer");

    // clone pattern (very simplified). In prod: use OpenZeppelin Clones
    address token;
    bytes20 targetBytes = bytes20(erc20Implementation);
    assembly {
      let clone := mload(0x40)
      mstore(clone, 0x3d602d80600a3d3981f3)
      mstore(add(clone, 0x14), shl(0x60, targetBytes))
      mstore(add(clone, 0x28), 0x5af43d82803e903d91602b57fd5bf3)
      token := create(0, clone, 0x37)
    }
    require(token != address(0), "deploy failed");
    IERC20Mint(token).initialize(name, symbol, decimals, supply, msg.sender);

    emit Launched(msg.sender, token, name, symbol, supply);
  }
}
