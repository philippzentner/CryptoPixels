import React from "react";

export default function Faq({ }) {

  const faqs = [
    {
      id: 1,
      question: "What is Cryptopixels?",
      answer: "Cryptopixels is a NFT based Grid of 1 Million Pixels. When you buy Cryptopixels NFTs you actually own a dedicated area on cryptopixels.org There you can upload images with a hyperlink, for example to promote your artist page. The price for 1 Pixel is $1. Cryptopixel NFTs are sold in 10x10 Pixel Block (100 Pixels = 1NFT). When 990,000 Pixels have been sold an auction for the last 10,000 Pixels (Center Piece) starts. After the auction ends, all NFTs are revealed.",
    },
    {
      id: 2,
      question: "What is the minimum amount I can buy?",
      answer: "All pixels are sold in NFT form as Blocks of 10x10 = 100 Pixels which equals $100, as 1 Pixel wouldn't be enough to display any sort of image.",
    },
    {
      id: 3,
      question: "What is the maximum amount I can buy?",
      answer: "There is no maximum amount of pixels you can buy, as long as they are not already sold.",
    },
    {
      id: 4,
      question: "Can I select a specific area on the grid? ",
      answer: "Yes, every pack of Pixels has unique coordinates which match the grid.",
    },
    {
      id: 5,
      question: "How do I know where my Pixels are located?",
      answer: "Simply select the Pixels you want to buy.",
    },
    {
      id: 6,
      question: "Where can I buy Cryptopixels?",
      answer: "You can buy Cryptopixels directly on Cryptopixels.org.",
    },
    {
      id: 7,
      question: "How do I upload an image after I bought the Pixels?",
      answer: "After you bought the NFT which represents your Pixels, you open CryptoPixels.org and sign in with Metamask or another Wallet of your Choice. Cryptopixels.org then detects your dedicated area and lets you upload your image after the initial sale has ended.",
    },
    {
      id: 8,
      question: "What happens when 960,000 Pixels are sold?",
      answer: "After this an auction with the last 40,000 Pixels starts - the most valuable centerpiece.",
    },
    {
      id: 9,
      question: "Can I sell my NFT?",
      answer: "Of course. After you bought yourself an NFT you can resel it as you like on all platforms that support NFT integration, including CryptoPixsels.org itself.",
    },
    {
      id: 10,
      question: "What properties does the NFT have? ",
      answer: "The NFT represents the location of the pixels on the blockchain. It allows you to claim your area on cryptopixels.org and upload an image with a hyperlink. ",
    },
    {
      id: 11,
      question: "Do you I have to upload an image after I bought the NFT?",
      answer: "No, but of course we encourage you to do it. As you also get to choose a hyperlink that guides people who click on your image to your desired destination.",
    },
    {
      id: 12,
      question: "What images can I upload?",
      answer: "We will approve any image before it shows on our website. As long as you image doesn't get us into legal trouble - you can upload whatever you like.",
    },
    {
      id: 13,
      question: "Can I add a hyperlink to my image?",
      answer: "Yes, in the upload process you are able to add a hyperlink to your image. People who click on your image will see it and are able to click it.",
    },
    {
      id: 14,
      question: "Can I upload bigger images than 10x10 Pixels?",
      answer: "Yes, you can, if you own 2 or more NFTs whose location is bordering each other.",
    },
    {
      id: 15,
      question: "How much will a pixel be worth?",
      answer: "All Crpyotpixels NFTs have following attributes: Pixel Location (x;y) , Number of Pixels & a Unique Number (e.g. 1123).  Initially every Cryptopixels NFT is sold for 100$ for 10x10 Pixels [Except the Center Piece, which is 10,000 Pixels] After that their owners are free to keep or sell them on secondary markets. Therefore it's possible that corners, closeness to the center, round numbers (1000) or nice numbers (1111) make one NFT more valuable than another. ",
    },
    {
      id: 16,
      question: "Why should I buy a pixel block and what can I do with it?",
      answer: "15 years ago we wrote internet history with the milliondollarpage. Today, we're celebrating a new era of interconnectedness, technology and the blockchain-age. To celebrate this, we want to create a living piece of art that is constantly evolving.",
    },
    {
      id: 17,
      question: "Is this a cheap copy of the milliondollarhomepage.com?",
      answer: "Well, it's a crypto copy with various improvements. But as the founder Alex Tew of the milliondollarhomepage said: 'Good luck to the imitators!'",
    },
    {
      id: 18,
      question: "Where are the images stored?",
      answer: "All images are stored on an IFPS - the standard for NFT based blockchain projects. On top we're pinning IPFS hosted files on Arweave to make them permanent.",
    },
  ];

  return (
    <div className="textPage">
        <h2>FAQ</h2>

        <div className="faqs">
          {faqs.map((faq) => (
            <dl key={faq.id}>
              <dt>{faq.question}</dt>
              <dd>{faq.answer}</dd>
            </dl>
          ))}
        </div>
    </div>
  );
}
