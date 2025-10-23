// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract T3ProPass {
  string public name = "T3 Pro Pass";
  string public symbol = "T3PASS";
  uint256 public totalSupply;
  address public owner;
  mapping(uint256 => address) public ownerOf;
  mapping(address => uint256) public balanceOf;

  event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

  modifier onlyOwner() { require(msg.sender == owner, "owner"); _; }

  constructor() { owner = msg.sender; }

  function mint(address to, uint256 tokenId) external onlyOwner {
    require(ownerOf[tokenId] == address(0), "exists");
    ownerOf[tokenId] = to;
    balanceOf[to] += 1;
    totalSupply += 1;
    emit Transfer(address(0), to, tokenId);
  }

  function transferFrom(address from, address to, uint256 tokenId) external {
    require(msg.sender == from || msg.sender == to, "auth");
    require(ownerOf[tokenId] == from, "not owner");
    ownerOf[tokenId] = to;
    balanceOf[from] -= 1;
    balanceOf[to] += 1;
    emit Transfer(from, to, tokenId);
  }
}
