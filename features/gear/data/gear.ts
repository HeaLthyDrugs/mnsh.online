
export interface GearItem {
    name: string;
    description: string;
    url: string;
    image?: string;
    category: "Hardware" | "Audio" | "Smart Home" | "Accessories" | "Other";
}

export const GEAR: GearItem[] = [
    {
        name: "MacBook Pro 14\"",
        description: "M1 Pro, 16GB RAM, 512GB SSD. The best laptop used for development.",
        url: "https://www.apple.com/macbook-pro/",
        category: "Hardware",
        image: "https://www.apple.com/v/macbook-pro-14-and-16/b/images/overview/hero/hero_intro_endframe__e6khcva4hkeq_large.jpg",
    },
    {
        name: "iPhone 15 Pro",
        description: "My daily driver. The camera is amazing for quick shots.",
        url: "https://www.apple.com/iphone-15-pro/",
        category: "Hardware",
        image: "https://www.apple.com/v/iphone/home/bu/images/overview/select/iphone_15_pro__bpnjhcrxofqu_large.png",
    },
    {
        name: "Sony WH-1000XM4",
        description: "Noise cancelling headphones that help me focus.",
        url: "https://electronics.sony.com/audio/headphones/headband/p/wh1000xm4-b",
        category: "Audio",
        image: "https://www.sony.com/image/5d02da5df552836db894cead8a68f5f3?fmt=png-alpha&wid=440",
    },
    {
        name: "Keychron K2",
        description: "Wireless mechanical keyboard. Compact and tactile.",
        url: "https://www.keychron.com/products/keychron-k2-wireless-mechanical-keyboard",
        category: "Accessories",
        image: "https://cdn.shopify.com/s/files/1/0059/0630/1017/products/Keychron-K2-Wireless-Mechanical-Keyboard-for-Mac-Windows-iOS-Gateron-Red-Switch-RGB-Backlight-Aluminum-Frame_1800x1800.jpg?v=1612248545",
    },
    {
        name: "LG 27\" 4K Monitor",
        description: "Crucial for multitasking and having multiple windows open.",
        url: "https://www.lg.com/us/monitors",
        category: "Hardware",
        image: "https://www.lg.com/us/images/monitors/md07525836/gallery/medium01.jpg",
    }
];
