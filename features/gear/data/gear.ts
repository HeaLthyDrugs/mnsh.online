
export interface GearItem {
    name: string;
    description: string;
    url: string;
    image?: string;
}

export const GEAR: GearItem[] = [
    {
        name: "Acer 4k Monitor",
        description: "My primary display for writing code. Crisp setup for long hours.",
        url: "https://www.amazon.in/Acer-Backlit-Adjustable-Certified-Speakers/dp/B0D4QLXLBH/ref=sr_1_4?crid=266MY0GJN47DF&dib=eyJ2IjoiMSJ9.CfcgE8aaN9EkNr4XhhwGTlnnpOFDi_YxjUi8ynV8pjObyqGlk9dId3Jir1vGKD9bPG-vs09lna3LLcoLRqYH-dGRzTynIa0O6y2tO70ox6KoNTXpty0S-uVQLZzSw5M4f5QUjlyZcnz6UCjF-tVjuo8UyGZuFpQjbzhKbvihWLR9GcPERGNwc3UFUnK0mT6Iaf8xHf7VnoiXip9NtJ_c6AJtgP3ZZVqwoc4iCrJzuqI._cT2e0NQ-ddDzCbUzZ85L0mgLXEtNvI9hnjRsVWauVw&dib_tag=se&keywords=Acer+4k+monitor&nsdOptOutParam=true&qid=1747062328&sprefix=acer+4k+monitor%2Caps%2C203&sr=8-4",
        image: "https://m.media-amazon.com/images/I/716cWivRkQL._SL1500_.jpg",
    },
    {
        name: "Poco F1",
        description: "My trusty daily driver. Still handles everything I throw at it.",
        url: "https://www.amazon.in/Poco-Xiaomi-Steel-128GB-Storage/dp/B07GXX2MDQ",
        image: "https://m.media-amazon.com/images/I/51SXBFFu9wL._SL1000_.jpg",
    },
    {
        name: "Mac Mini M4",
        description: "My main workstation. Compact, silent, and incredibly powerful.",
        url: "https://www.amazon.in/Apple-2024-Desktop-Computer-10%E2%80%91core/dp/B0DLCNVB5J/ref=sr_1_1_sspa?crid=34PIDRSJO59B6&dib=eyJ2IjoiMSJ9.qy57AGeIXgokG7cmnLzTx86vf915jFObFB1XnUAdMngCMZl8cXZVqnohv-TXZhCXp3s3hOy9llO2MngJCH8ATkBgrrQ8BVj_ffnZwGyR51k93nGmvfwZcr0rEAi2P5LInWFBBzHpXajKaequ5qkJOmczxQon7xrwJHDu68t7AMH6F-gcirYCe8_SWLNOCTU-7caSGV8dLDkcrMG5sAp0IoX7jH4ObetwTr667sEwOWRD0pgauMEtpjehYSnGZlCv_S7AZ0x_itmthOU6MIZdcWVlKNbCMLKUGipvnzY-e1A.p7IoYyrdhvAmq1pc8suRnTYMpyfnh_8GPP8EjJzUhYY&dib_tag=se&keywords=Mac+mini&qid=1772729234&s=electronics&sprefix=mac+mini%2Celectronics%2C341&sr=1-1-spons&aref=TFlxRH9MvC&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&psc=1",
        image: "https://m.media-amazon.com/images/I/61hpKVB9X2L._SL1500_.jpg",
    },
    {
        name: "Logitech M171",
        description: "A simple, reliable wireless mouse perfect for everyday tasks.",
        url: "https://www.keychron.com/products/keychron-k2-wireless-mechanical-keyboard",
        image: "https://rukminim2.flixcart.com/image/1369/1369/xif0q/mouse/y/9/e/m171-logitech-original-imaha8fwqxjdkvd2.jpeg?q=90",
    },
    {
        name: "Logitech K120",
        description: "A tough, zero-nonsense keyboard that gets the job done.",
        url: "https://www.lg.com/us/monitors",
        image: "https://rukminim2.flixcart.com/image/1369/1369/xif0q/keyboard/o/o/k/-original-imah2hcguzr5sxes.jpeg?q=90",
    },
    {
        name: "Intel Core i5 12400",
        description: "The heart of my PC build. Great balance of performance and value.",
        url: "https://www.amazon.in/Intel-i5-12400-Desktop-Processor-Cache/dp/B09NMPD8V2/ref=sr_1_1?crid=1NWECTISCB2KD&dib=eyJ2IjoiMSJ9.py06pC1QXlJgNeou-nfrzKFEE1i22-9vZ4EQIp4lDPma6zDB3vgossgX59kIOCj9gLS3lIV9Z0oOyHFudvkWSrKKmGqrBv9Uj9zDHkzqVDzTxskO-8KBzEYDHVuRfonM9J3xO_2to0U-0u1N6SGEoEPr0EOmjOS04O7lGEibK0XV9h18ND9-NSaavolM02zCjmDU_mDTGPUzCe8sq7PXuNkC3AHX5BlFDJcjmoJwa-4.zOm8D14whlo0m_HIIKptlw3XRPziNKgx7uexI4Utv2U&dib_tag=se&keywords=i5%2B12400&qid=1747063225&sprefix=i5%2B12400%2B%2Caps%2C213&sr=8-1&th=1",
        image: "https://m.media-amazon.com/images/I/51V+MalhMHL._SL1000_.jpg",
    },
    {
        name: "XPG DDR4 16GB (1x16GB)",
        description: "Enough memory to keep all my development servers running smoothly.",
        url: "https://www.amazon.in/XPG-GAMMIX-1x16GB-3200MHz-Desktop/dp/B085HS73KD/ref=sr_1_3_mod_primary_new?crid=30FWPEXP76KL6&dib=eyJ2IjoiMSJ9.CqruxSz6H8uESoa6uox5wu38bx0IiiorecsfgrKqBq7cISaCL81ua6xyZeGhXeFzznaVCARM1mQs9hsHjeRp3WcljEeWRjCzYTmi4QKnDlrN47rjIuvYu7KfO9Zu0FvlUNido420EHmb2U3aE6UEDRw3bOBTu7ZIpAhNHKDWTj1tPMZsYTsclrBYBzb6jm4G1OmKiIPN6vGG3tsL0Vq1lCGCc0pZuy_XQpX6OhoNU0A.B7zBX2ZdHAiTE0aHAq1XeRUshhrCsPIXwWoZorfesJA&dib_tag=se&keywords=16gb%2Bram&qid=1747062279&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=16gb%2Bram%2Caps%2C238&sr=8-3&th=1",
        image: "https://m.media-amazon.com/images/I/81lTPWJ+QZL._SL1500_.jpg",
    },
    {
        name: " WD Blue 500GB",
        description: "Fast NVMe storage for quick boot times and rapid project loading.",
        url: "https://www.amazon.in/Western-Digital-500GB-SN5000-Internal/dp/B0D7MKQKXZ/ref=sr_1_4?crid=1NOFAFVH83ECM&dib=eyJ2IjoiMSJ9.3rWOjztHLGWuBrXbyxT682VdRUX5Kmtx-HFJ_ncC8d7ec9T7V_cnQRkqGAO-zk8bAqKh7Xd38Pi-9wu7TQzBpGWD1GVuHcq_yck5Bxs307H_CbsvsCXIOD1424ukHuuRMkUQch7Vsi7d-3goHdwQ8xLb6x1zR7v7KL6VcEeh-VJtX0FBtRiBhP0CxJCGkKbFHkDYxVMxMGDCppupnGcnvLmgz_grDBzZIrwb-U2zgaM.VQ4WjhkWSIaNN-0yFpJYPORoh9mGfbqOFkvJMEAZ5_0&dib_tag=se&keywords=500gb%2Bssd%2Bnvme&qid=1747062977&sprefix=500gb%2Bssd%2Bnvme%2Caps%2C211&sr=8-4&th=1",
        image: "https://m.media-amazon.com/images/I/61w5yE7SNCL._SL1500_.jpg",
    },
    {
        name: "GIGABYTE RTX 5060",
        description: "Provides the horsepower for UI rendering and occasional gaming.",
        url: "https://www.amazon.in/GIGABYTE-GeForce-WINDFORCE-GDDR7-Graphics/dp/B0FFQCW6RB/ref=sr_1_2?crid=1LGC4R7LJNFES&dib=eyJ2IjoiMSJ9.mvaiyw_JUY6rdfMYpyVWaqLefwCU7HryzLLpaKHBM0CdAVPDzyMBzmJ8hPtGdwMNX2LnF5GqxtdV0AFp16_-6ugY_bPv4EZsfrIwhh-O_WdB5FbU8n6byLyap4jDpCsuY4MCgmlYJhiTWWS1LbJ65vBcYQsZl1KJ-4Z7LjEZVDNxsS-km1t7jeJTceve9Ii0UZ4jAJpKwXjJlpsBZS7rtORaRT7cyVgcy0iBMdNLIzo.RyhI5rNRlOV0kQOwZoZQ0iazGqo5rk2DwTnLKbE2dLA&dib_tag=se&keywords=RTX%2B5060&qid=1772730542&sprefix=rtx%2B5060%2Caps%2C371&sr=8-2&th=1",
        image: "https://m.media-amazon.com/images/I/71JLhI7zH8L._SL1500_.jpg",
    },
    {
        name: "ASRock B760M Pro RS/D4",
        description: "A solid motherboard bridging all my components together reliably.",
        url: "https://www.asrock.com/mb/Intel/B760M%20Pro%20RSD4/index.asp#Specification",
    },
    {
        name: "MSI Cabinet",
        description: "A high-airflow case keeping the entire system running cool.",
        url: "https://www.amazon.in/MSI-Forge-Airflow-Premium-Gaming/dp/B0CFYMC6SJ/ref=sr_1_1?crid=3N17L6THJ5JP&dib=eyJ2IjoiMSJ9.pdHdkP1OpyzhVPSjjoQUBSabn91hsMPjTCwbbcdU1RxA_OsXQ47TiDUj_j7Pd2WQa55818gxSketg0Kn3mOKiaLTd0k5-O4yr7crppEqEKASvomLH7V4yvXbmYfTsGnWfXXgxG7UMf_JbQ9irIZnSVpMGlvjb6uxapcBspuHtDKK543rUiqAXAchRmEzpjmUNZESlpIWAJyOImPrRUZb_opGRt9vO5iM0h0HRyTA-Dc.XeCngN5Okf8EkNxpnhoE2NG3i8iqaZ5iAtCARSlQEyo&dib_tag=se&keywords=MSi+mag+cabinet&qid=1747063289&sprefix=msi+mag+cabinet%2Caps%2C214&sr=8-1",
        image: "https://m.media-amazon.com/images/I/71wl8e4ByKL._SL1500_.jpg",
    },
    {
        name: "Notebook",
        description: "For wireframing, brainstorming, and jotting down ideas offline.",
        url: "https://www.amazon.in/Cubic-Premium-Hardbound-Leather-Bookmark/dp/B0F7G52JDJ/ref=asc_df_B0F7G52JDJ?mcid=c99c04c5b4773f33aacd4dd96cc9f847&tag=googleshopdes-21&linkCode=df0&hvadid=723033518327&hvpos=&hvnetw=g&hvrand=10561157914853132514&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9300040&hvtargid=pla-2433111211865&gad_source=1&th=1",
        image: "https://m.media-amazon.com/images/I/61Qv0liLVKL._SL1500_.jpg",
    },
];
