import Moralis from "moralis";
import { NextApiRequest, NextApiResponse } from "next";

Moralis.start({
    apiKey: process.env.NEXT_PUBLIC_SECRET_KEY,
});
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { chain, address }: any = req.query

        const tokens = await Moralis.EvmApi.token.getWalletTokenBalances({
            chain,
            address,
        });

        const nfts = await Moralis.EvmApi.nft.getWalletNFTs({
            chain,
            address,
            mediaItems: true,
        });

        const myNfts = nfts.raw.result.map((e: any, i: any) => {
            if (e?.media?.media_collection?.high?.url && !e.possible_spam && (e?.media?.category !== "video")) {
                return e["media"]["media_collection"]["high"]["url"];
            }
        })

        const balance: any = await Moralis.EvmApi.balance.getNativeBalance({
            chain,
            address
        });

        const jsonResponse = {
            tokens: tokens.raw,
            nfts: myNfts,
            balance: balance.raw.balance,
        }

        res.status(200).json(jsonResponse)
    } catch (err: any) {
        res.status(200).json({ error: err })
    }

}