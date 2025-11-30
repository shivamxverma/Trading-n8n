
export type NodeMetadata = TradingMetadata | PriceTriggerMetadata | TimerMetadata;

export type TradingMetadata = {
  type: string;
  symbol: string;
}

export type PriceTriggerMetadata = {
  asset: string;
  price: number;
  decimals: number;
}

export type TimerMetadata = {
  time: number;
}

export const SUPPORTED_ACTIONS = [
    { 
        id: 'hyperliquid', 
        title: 'Hyperliquid', 
        description: 'Execute trades on Hyperliquid exchange.' 
    },
    { 
        id: 'lighter', 
        title: 'Lighter', 
        description: 'Manage your crypto portfolio with Lighter.' 
    },
    {
        id: 'backpack',
        title: 'Backpack',
        description: 'Interact with your Backpack wallet.'
    }
]

export const SUPPORTED_TRIGGERS = [
    { 
        id: 'price-trigger', 
        title: 'Price Trigger', 
        description: 'Triggers when a specific price point is reached.' 
    },
    { 
        id: 'timer', 
        title: 'Timer', 
        description: 'Triggers at specified time intervals.' 
    },
]

export const SUPPORTED_ASSETS = [
    { id: 'SOL', title: 'Solana (SOL)' },
    { id: 'BTC', title: 'Bitcoin (BTC)' },
    { id: 'ETH', title: 'Ethereum (ETH)' },
]

export type TradingMetadataForActions = {
    type : "LONG" | "SHORT";
    qty : number;
    symbol : typeof SUPPORTED_ASSETS;
}

export type PriceMetadata = {
    asset : string;
    price : number;
    decimals : number;
}
