export const sellType = {
  SellOrder: [
    { name: "_nonce", type: "string" },
    { name: "_startsAt", type: "uint" },
    { name: "_expiresAt", type: "uint" },
    { name: "_nftContract", type: "address" },
    { name: "_nftTokenId", type: "uint256" },
    { name: "_paymentTokenContract", type: "address" },
    { name: "_seller", type: "address" },
    { name: "_royaltyPayTo", type: "address" },
    { name: "_sellerAmount", type: "uint256" },
    { name: "_feeAmount", type: "uint256" },
    { name: "_royaltyAmount", type: "uint256" },
    { name: "_totalAmount", type: "uint256" },
  ],
};

export const buyType = {
  BuyOrder: [
    { name: "_nonce", type: "string" },
    { name: "_startsAt", type: "uint" },
    { name: "_expiresAt", type: "uint" },
    { name: "_nftContract", type: "address" },
    { name: "_nftTokenId", type: "uint256" },
    { name: "_paymentTokenContract", type: "address" },
    { name: "_buyer", type: "address" },
    { name: "_royaltyPayTo", type: "address" },
    { name: "_sellerAmount", type: "uint256" },
    { name: "_feeAmount", type: "uint256" },
    { name: "_royaltyAmount", type: "uint256" },
    { name: "_totalAmount", type: "uint256" },
  ],
};
