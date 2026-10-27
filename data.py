"""Content and catalogue for the Com1 website.

Company details, categories and the product catalogue are taken from the public
site at https://com1pbx.com (IP PBX / gateway / IP phone catalogue). Product
images are hot-linked from the com1pbx.com CDN and every view falls back to a
typographic tile if an image cannot load.

Only specifications that the source actually publishes are reproduced; other
models deliberately show a "datasheet on request" notice instead of invented
numbers.
"""

IMG = "https://website.com1pbx.com/assets/product/image"

COMPANY = {
    "name": "Com1",
    "legal": "Mark Consulting",
    "tagline": "IP PBX, call centre and IP paging, built on open standards",
    "phone": "+91 98840 19019",
    "phone_href": "+919884019019",
    "email": "srini@trust.co.in",
    "site": "https://com1pbx.com",
    "since": "1990s",
    "address": "Chennai, Tamil Nadu, India",
}

HERO = {
    "eyebrow": "More than a phone system",
    "title": "Communication that fits your business.",
    "body": (
        "Com1 brings native IP telephony, call centre automation and IP paging "
        "together on one platform - installed on standard hardware, opened up with "
        "APIs, and running on any SIP endpoint you choose."
    ),
}

FEATURE_STRIP = [
    {
        "icon": "chip",
        "title": "Native IP PBX",
        "body": "Built on IP from the ground up, not PCM/TDM with a VoIP card bolted on.",
    },
    {
        "icon": "headset",
        "title": "Call Centre Suite",
        "body": "Predictive, progressive and preview dialing with a live agent dashboard.",
    },
    {
        "icon": "speaker",
        "title": "IP Paging",
        "body": "Multicast paging, PA gateways and intercom on the same network.",
    },
    {
        "icon": "open",
        "title": "Open Endpoints",
        "body": "Use any SIP phone from any supplier. No proprietary handsets.",
    },
]

CATEGORIES = [
    {"slug": "ip-phones", "code": "SC1005", "name": "IP Phones"},
    {"slug": "gsm-gateways", "code": "SC1010", "name": "GSM Gateways"},
    {"slug": "fxs-gateways", "code": "SC1011", "name": "FXS Gateways"},
    {"slug": "fxo-gateways", "code": "SC1012", "name": "FXO Gateways"},
    {"slug": "pri-gateways", "code": "SC1013", "name": "PRI Gateways"},
    {"slug": "pa-gateways", "code": "SC1014", "name": "PA Gateways"},
    {"slug": "ip-pa-speakers", "code": "SC1038", "name": "IP PA Speakers"},
    {"slug": "ip-intercom", "code": "SC1127", "name": "IP Intercom"},
    {"slug": "emergency-call-box", "code": "SC1123", "name": "Emergency Call Box"},
]

BRANDS = ["Yealink", "Snom", "Fanvil", "Grandstream", "Dinstar"]

STATS = [
    {"value": "1990s", "label": "Telecom roots, from manual PBX to digital EPABX"},
    {"value": "3+", "label": "Decades building voice platforms"},
    {"value": "< 1 hr", "label": "Full reinstall on new hardware"},
    {"value": "ISO", "label": "Installer published online"},
]

DEPLOYMENTS = [
    {"name": "On-premise", "colour": "#141414"},
    {"name": "Virtual machine", "colour": "#a8a8a2"},
    {"name": "Public cloud", "colour": "#dcdcd6"},
    {"name": "Hybrid", "colour": "#6f7a6c"},
]

PLATFORM_SPECS = [
    {
        "icon": "server",
        "title": "Runs on standard hardware",
        "body": "Any desktop, server or VM - no proprietary chassis, no dealer lock-in.",
    },
    {
        "icon": "lines",
        "title": "PRI, SIP, GSM, FXS, FXO",
        "body": "Every trunk type terminates on one platform, side by side.",
    },
    {
        "icon": "api",
        "title": "APIs and webhooks",
        "body": "Embed the WebRTC phone, drive pop-ups, stream call events into any CRM.",
    },
    {
        "icon": "shield",
        "title": "Licence portability",
        "body": "Move licences between machines as many times as you need.",
    },
]

SOLUTIONS = [
    {
        "slug": "ip-pbx",
        "eyebrow": "Core platform",
        "title": "IP PBX",
        "body": (
            "A fully native IP PBX that scales from a single office to a "
            "multi-location deployment, with extensions, trunks, IVR, queues and "
            "conferencing on one platform."
        ),
        "points": [
            "Extensions and trunks over a single IP backbone",
            "IVR, queues, ring groups, voicemail to email",
            "Multi-location interconnection over SIP",
            "Deploys on-premise, virtualised or in cloud",
        ],
    },
    {
        "slug": "call-centre",
        "eyebrow": "Outbound and inbound",
        "title": "Call Centre Suite",
        "body": (
            "Predictive, progressive and preview dialing in the same system. Genie, "
            "the live dashboard, shows agent and campaign state in real time from "
            "any location."
        ),
        "points": [
            "Self-designed dispositions, no developer needed",
            "Number masking and a built-in basic CRM",
            "Flexible CLI: random, variable or fixed",
            "Exhaustive agent-wise and campaign-wise reporting",
        ],
    },
    {
        "slug": "ip-paging",
        "eyebrow": "Announcements",
        "title": "IP Paging and Intercom",
        "body": (
            "Multicast paging across speakers, intercom terminals and PA gateways "
            "using the network you already run for voice."
        ),
        "points": [
            "Multicast and auto-answer paging",
            "PA gateways for legacy analogue speakers",
            "IP intercom and emergency call boxes",
            "Zone-based announcements from any handset",
        ],
    },
    {
        "slug": "conferencing",
        "eyebrow": "Meetings",
        "title": "Bridge Conferencing",
        "body": (
            "Meet-me bridges and conference rooms integrated into the PBX, with "
            "purpose-built conference endpoints from Yealink and Snom."
        ),
        "points": [
            "Meet-me conferencing with PIN control",
            "HD conference endpoints for medium to large rooms",
            "Hybrid UC meetings over Bluetooth and USB",
            "Recording and participant reporting",
        ],
    },
    {
        "slug": "ticketing",
        "eyebrow": "Service desks",
        "title": "Ticketing Solution",
        "body": (
            "Turn every inbound call into a tracked ticket, routed to the right team "
            "with SLA visibility and a complete interaction history."
        ),
        "points": [
            "Ticket creation straight from the agent pop-up",
            "Routing, escalation and SLA timers",
            "Full call and disposition history per customer",
            "REST APIs for third-party systems",
        ],
    },
    {
        "slug": "gateways",
        "eyebrow": "Connectivity",
        "title": "Trunk and Legacy Gateways",
        "body": (
            "Bring PSTN, GSM and legacy analogue infrastructure onto the IP platform "
            "with FXS, FXO, PRI and GSM gateways."
        ),
        "points": [
            "GSM / VoLTE gateways from 4 to 32 ports",
            "FXS and FXO gateways for analogue lines and phones",
            "PRI gateways for existing digital trunks",
            "SIM bank options for large GSM deployments",
        ],
    },
]

DEALERS = [
    "Trust Marketing",
    "Trust Solution",
    "Aspire Systems And Solution",
    "Vasani Enterprises",
    "Pageant Systems Pvt. Ltd.",
]

DIALING_MODES = [
    {
        "mode": "Predictive",
        "method": "Automatic, several numbers dialed per agent",
        "risk": "Highest dropped-call risk",
        "best": "High-volume outbound campaigns",
    },
    {
        "mode": "Progressive",
        "method": "Automatic, one number per free agent",
        "risk": "No dropped calls",
        "best": "Quality-focused sales and support",
    },
    {
        "mode": "Preview",
        "method": "Semi-automatic, agent starts the call",
        "risk": "No dropped calls",
        "best": "Complex or high-value interactions",
    },
]

DASHBOARD_ROWS = [
    ("Inbound queue", "4 waiting", "ok"),
    ("Predictive campaign", "Running", "ok"),
    ("Paging zone - Block B", "Idle", "idle"),
]


def p(**kw):
    """Product factory, fills the optional keys so templates stay simple."""
    kw.setdefault("image", "")
    kw.setdefault("featured", False)
    kw.setdefault("highlights", [])
    kw.setdefault("specs", [])
    kw.setdefault("features", [])
    kw.setdefault("description", "")
    kw.setdefault("tags", [])
    kw.setdefault("summary", "")
    kw.setdefault("source", "")
    return kw


PRODUCTS = [
    # ------------------------------------------------------------- Yealink
    p(
        slug="yealink-cp965-conference",
        name="Yealink CP965 Conference",
        brand="Yealink",
        category="ip-phones",
        image=IMG + "/ip_phone/yealink/SP1169.webp",
        featured=True,
        summary="Flagship Android 9 conference phone with 13-microphone 360 degree pickup.",
        tags=["Android", "Wi-Fi", "Bluetooth", "Conferencing", "Black"],
        source="https://com1pbx.com/product/ip-phone-yealink-cp965-conference",
        description=(
            "Yealink CP965 is a flagship HD conference phone designed for medium and "
            "large conference rooms, running on Android 9.0. It features a "
            "business-style acoustic fabric design resistant to spills and a "
            "fingerprint-proof 5-inch multi-touch LCD. With 13 built-in microphones it "
            "delivers clear 360-degree voice pickup up to 20 feet, and it can link with "
            "three CP units for synchronised audio."
        ),
        highlights=[
            "10 SIP lines",
            "5 inch 720x1280 multi-touch screen",
            "Android 9 operating system",
            "360 degree voice pickup, up to 6 m",
            "13 built-in microphones",
            "HD audio with Noise Proof technology",
            "USB and Bluetooth for hybrid meetings",
            "Built-in dual-band Wi-Fi and PoE",
        ],
        specs=[
            ("SIP Lines", "10"),
            ("Colour", "Black"),
            ("Screen", "5 inch 720x1280 touch screen"),
            ("DSS Keys", "10"),
            ("Wideband Codec", "Wideband codecs with Noise Proof"),
            ("PoE", "Yes, IEEE 802.3at class 4"),
            ("Wi-Fi", "Built-in dual-band 2.4G / 5G"),
            ("Bluetooth", "Built-in Bluetooth 4.2"),
            ("USB", "1 x USB-A, 1 x USB-C"),
            ("Network", "1 x RJ45 10/100M"),
            ("Conferencing", "10-way audio conferencing"),
            ("Speaker", "56 mm, 5 W, 94 dB at 0.5 m"),
        ],
        features=[
            "Yealink Noise Proof Technology with smart noise filtering",
            "Full-duplex speakerphone with AEC, 320 ms echo tail",
            "12-microphone array plus 1 noise-cancellation microphone",
            "Codecs: G722, G722.1C, G726, G.729, G.723, iLBC, PCMU, PCMA",
            "BLF, multicast paging, intercom, voicemail, call pickup",
            "SRTP, TLS 1.3, HTTPS provisioning, OpenVPN, WPA2/WPA3",
            "Auto provisioning via FTP/TFTP/HTTP/HTTPS, zero-touch",
            "Dimensions 328 x 322 x 62 mm, PoE 7.3 W to 20 W",
        ],
    ),
    p(
        slug="yealink-cp935w",
        name="Yealink CP935W",
        brand="Yealink",
        category="ip-phones",
        image=IMG + "/ip_phone/yealink/SP1171.webp",
        summary="Wireless conference phone for mid-sized meeting rooms.",
        tags=["Wi-Fi", "Bluetooth", "Conferencing", "Black"],
        source="https://com1pbx.com/product/ip-phone-yealink-cp935w",
        description=(
            "A wireless conference phone from Yealink's CP series, aimed at mid-sized "
            "meeting rooms where cabling is impractical. Supplied and provisioned by "
            "Com1 with local support."
        ),
        highlights=["Wireless deployment", "HD conference audio", "Touch interface"],
        specs=[("Series", "Yealink CP"), ("Connectivity", "Wi-Fi, Bluetooth"), ("Use case", "Mid-sized meeting rooms")],
    ),
    p(
        slug="yealink-cp935w-base",
        name="Yealink CP935W-Base",
        brand="Yealink",
        category="ip-phones",
        image=IMG + "/ip_phone/yealink/SP1170.webp",
        summary="Base configuration of the CP935W wireless conference phone.",
        tags=["Wi-Fi", "Conferencing"],
        source="https://com1pbx.com/product/ip-phone-yealink-cp935w-base",
        description="The base bundle of the CP935W wireless conference phone.",
        highlights=["Wireless deployment", "HD conference audio"],
    ),
    p(
        slug="yealink-ax83h-wifi",
        name="Yealink AX83H Wi-Fi",
        brand="Yealink",
        category="ip-phones",
        image=IMG + "/ip_phone/yealink/SP1173.webp",
        summary="Wi-Fi desk phone for wireless and hot-desk deployments.",
        tags=["Wi-Fi", "Gigabit", "Colour Screen"],
        source="https://com1pbx.com/product/ip-phone-yealink-ax83h-wi-fi",
        description=(
            "A Wi-Fi enabled desk phone that removes the Ethernet drop from the "
            "installation - useful for hot-desking, temporary sites and shared rooms."
        ),
        highlights=["Built-in Wi-Fi", "SIP registration over wireless", "PoE or adapter"],
    ),
    p(
        slug="yealink-ax86r-wifi",
        name="Yealink AX86R Wi-Fi",
        brand="Yealink",
        category="ip-phones",
        image=IMG + "/ip_phone/yealink/SP1172.webp",
        summary="Wireless SIP handset with a colour display.",
        tags=["Wi-Fi", "Bluetooth", "Colour Screen"],
        source="https://com1pbx.com/product/ip-phone-yealink-ax86r-wi-fi",
        description=(
            "Part of Yealink's wireless desk range, for spaces where pulling cable is "
            "the bottleneck rather than the phone itself."
        ),
        highlights=["Wi-Fi connectivity", "Colour display", "Multiple SIP accounts"],
    ),
    # ---------------------------------------------------------------- Snom
    p(
        slug="snom-d862",
        name="Snom D862",
        brand="Snom",
        category="ip-phones",
        summary="Gunmetal desk phone with a continuously tiltable display.",
        tags=["Executive", "Colour Screen", "Gigabit"],
        source="https://com1pbx.com/product/ip-phone-snom-d862",
        description=(
            "The Snom D862 is a stylish and versatile device from the D8xx series, "
            "designed with an elegant gunmetal black finish and a continuously "
            "tiltable display. Powered by a Linux operating system, it combines modern "
            "technology with excellent voice quality and a user friendly design. "
            "Suitable for indoor use, it can be placed on a desktop or mounted on a wall."
        ),
        highlights=["Gunmetal finish", "Continuously tiltable display", "Linux based"],
        specs=[("Series", "Snom D8xx"), ("Operating system", "Linux"), ("Mounting", "Desk or wall")],
    ),
    p(
        slug="snom-d815w",
        name="Snom D815W",
        brand="Snom",
        category="ip-phones",
        summary="5-inch IPS display, 10 SmartLabel keys and dual-band Wi-Fi.",
        tags=["Wi-Fi", "Executive", "Colour Screen"],
        source="https://com1pbx.com/product/ip-phone-snom-d815w",
        description=(
            "The Snom D815W is a premium choice for everyday office use, combining "
            "elegant design with advanced functionality. It features a large 5 inch IPS "
            "colour display, 10 programmable SmartLabel keys, two high speed USB 2.0 "
            "ports and integrated dual band Wi-Fi."
        ),
        highlights=[
            "5 inch IPS colour display",
            "10 programmable SmartLabel keys",
            "Integrated dual-band Wi-Fi",
            "Two USB 2.0 ports",
            "Antibacterial housing",
        ],
        specs=[("Display", "5 inch IPS colour"), ("Function keys", "10 SmartLabel"), ("Wi-Fi", "Dual band"), ("USB", "2 x USB 2.0")],
    ),
    p(
        slug="snom-d812",
        name="Snom D812",
        brand="Snom",
        category="ip-phones",
        summary="Entry-level professional desk phone with a 5-inch IPS display.",
        tags=["Basic", "Colour Screen"],
        source="https://com1pbx.com/product/ip-phone-snom-d812",
        description=(
            "The Snom D812 is an entry level model in the professional D8xx series. It "
            "features a large 5 inch IPS colour display, 8 freely programmable "
            "SmartLabel keys and a USB 2.0 high speed connection, in an antibacterial "
            "housing."
        ),
        highlights=[
            "5 inch IPS colour display",
            "8 programmable SmartLabel keys",
            "USB 2.0 high speed",
            "Antibacterial housing",
        ],
        specs=[("Display", "5 inch IPS colour"), ("Function keys", "8 SmartLabel"), ("USB", "USB 2.0")],
    ),
    p(
        slug="snom-d7c",
        name="Snom D7C",
        brand="Snom",
        category="ip-phones",
        summary="Expansion module with 16 physical and 48 virtual function keys.",
        tags=["Operator Console", "Accessory"],
        source="https://com1pbx.com/product/ip-phone-snom-d7c",
        description=(
            "The Snom D7C is a powerful expansion module with a 6.8 inch high-resolution "
            "TFT colour display designed for the Snom D7xx series. It connects via USB "
            "plug and play and offers 16 physical keys with up to 48 virtual "
            "multi-coloured SmartLabel LED function keys. Up to three modules can be "
            "connected in series, with power supplied through the phone."
        ),
        highlights=[
            "6.8 inch TFT colour display",
            "16 physical keys, 48 virtual SmartLabels",
            "USB plug and play",
            "Chain up to three modules",
        ],
        specs=[("Display", "6.8 inch TFT colour"), ("Physical keys", "16"), ("Virtual keys", "48"), ("Chain limit", "3 modules")],
    ),
    p(
        slug="snom-d8c",
        name="Snom D8C",
        brand="Snom",
        category="ip-phones",
        summary="Expansion module with 60 programmable keys across three pages.",
        tags=["Operator Console", "Accessory"],
        source="https://com1pbx.com/product/ip-phone-snom-d8c",
        description=(
            "The Snom D8C adds a large 6.8 inch TFT colour display to the D8xx series, "
            "offering 60 programmable buttons across three pages. It connects to the "
            "host phone over USB with plug and play, and up to two additional modules "
            "can be chained for busy environments."
        ),
        highlights=[
            "6.8 inch TFT colour display",
            "60 programmable buttons across three pages",
            "USB plug and play",
            "Chain up to two further modules",
        ],
        specs=[("Display", "6.8 inch TFT colour"), ("Buttons", "60, three pages"), ("Chain limit", "3 modules")],
    ),
    p(
        slug="snom-d735",
        name="Snom D735",
        brand="Snom",
        category="ip-phones",
        image=IMG + "/ip_phone/snom/SP1198.webp",
        summary="D7xx series desk phone with SmartLabel keys and HD audio.",
        tags=["Executive", "Colour Screen"],
        source="https://com1pbx.com/product/ip-phone-snom-d735",
        description=(
            "A D7xx series desk phone with the SmartLabel key layout, HD audio and the "
            "build quality Snom is known for, supplied and provisioned by Com1."
        ),
        highlights=["SmartLabel keys", "HD audio", "PoE"],
    ),
    p(
        slug="snom-d735w",
        name="Snom D735W",
        brand="Snom",
        category="ip-phones",
        image=IMG + "/ip_phone/snom/SP1199.webp",
        summary="Wi-Fi variant of the D735 desk phone.",
        tags=["Wi-Fi", "Executive", "Colour Screen"],
        source="https://com1pbx.com/product/ip-phone-snom-d735w",
        description="The D735 with integrated wireless, for desks without a wired drop.",
        highlights=["SmartLabel keys", "Integrated Wi-Fi", "HD audio"],
    ),
    p(
        slug="snom-d713",
        name="Snom D713",
        brand="Snom",
        category="ip-phones",
        image=IMG + "/ip_phone/snom/SP1202.webp",
        summary="Compact professional desk phone for everyday office use.",
        tags=["Basic", "Compact"],
        source="https://com1pbx.com/product/ip-phone-snom-d713",
        description=(
            "The compact entry into the D7xx range - a practical choice for meeting "
            "rooms, back offices and shared desks."
        ),
        highlights=["Compact footprint", "HD audio", "PoE"],
    ),
    p(
        slug="snom-d717",
        name="Snom D717",
        brand="Snom",
        category="ip-phones",
        image=IMG + "/ip_phone/snom/SP1200.webp",
        summary="Desk phone with colour display and programmable keys.",
        tags=["Executive", "Colour Screen"],
        source="https://com1pbx.com/product/ip-phone-snom-d717",
        description="A D7xx series desk phone for general office users.",
        highlights=["Colour display", "Programmable keys", "PoE"],
    ),
    p(
        slug="snom-d385",
        name="Snom D385",
        brand="Snom",
        category="ip-phones",
        image=IMG + "/ip_phone/snom/SP1205.webp",
        summary="Colour-screen desk phone with programmable function keys.",
        tags=["Executive", "Colour Screen", "Gigabit"],
        source="https://com1pbx.com/product/ip-phone-snom-d385",
        description=(
            "A colour-screen desk phone for knowledge workers and supervisors, with "
            "programmable keys for BLF and speed dial."
        ),
        highlights=["Colour display", "Programmable function keys", "Gigabit"],
    ),
    # -------------------------------------------------------------- Fanvil
    p(
        slug="fanvil-a320",
        name="Fanvil A320 Android Touch Screen IP Phone",
        brand="Fanvil",
        category="ip-phones",
        image=IMG + "/ip_phone/fanvil/SP1045.webp",
        summary="Android-based touch screen phone for reception and supervisor desks.",
        tags=["Android", "Video", "Wi-Fi"],
        source="https://com1pbx.com/product/ip-phone-fanvil-a320",
        description=(
            "An Android touch screen IP phone for reception, supervisor and operator "
            "positions, where a rich interface matters more than a keypad."
        ),
        highlights=["Android interface", "Touch screen", "SIP-based"],
    ),
    p(
        slug="fanvil-a320i",
        name="Fanvil A320i Android Touch Screen IP Phone",
        brand="Fanvil",
        category="ip-phones",
        image=IMG + "/ip_phone/fanvil/SP1046.webp",
        summary="Android touch screen phone, A320i variant.",
        tags=["Android", "Video"],
        source="https://com1pbx.com/product/ip-phone-fanvil-a320i",
        description="The A320i variant of Fanvil's Android touch screen desk phone.",
        highlights=["Android interface", "Touch screen", "Multiple SIP accounts"],
    ),
    p(
        slug="fanvil-a308i",
        name="Fanvil A308i Android Touch Screen IP Phone",
        brand="Fanvil",
        category="ip-phones",
        image=IMG + "/ip_phone/fanvil/SP1044.webp",
        summary="Android touch phone with an integrated colour display.",
        tags=["Android", "Wi-Fi"],
        source="https://com1pbx.com/product/ip-phone-fanvil-a308i",
        description=(
            "An Android touch phone from the Fanvil A-series, sitting alongside the "
            "A320 in Com1's open-endpoint catalogue."
        ),
        highlights=["Android interface", "Touch screen", "Multiple SIP accounts"],
    ),
    p(
        slug="fanvil-a32i",
        name="Fanvil A32i Android Console IP Phone",
        brand="Fanvil",
        category="ip-phones",
        image=IMG + "/ip_phone/fanvil/SP1047.webp",
        summary="Android console phone for operator and attendant positions.",
        tags=["Android", "Operator Console"],
        source="https://com1pbx.com/product/ip-phone-fanvil-a32i",
        description="An Android console phone built for attendant and operator desks.",
        highlights=["Console form factor", "Android interface", "Touch screen"],
    ),
    p(
        slug="fanvil-x4",
        name="Fanvil X4 / X4G",
        brand="Fanvil",
        category="ip-phones",
        image=IMG + "/ip_phone/fanvil/SP1138.webp",
        summary="Workhorse desk phone with colour display and DSS keys.",
        tags=["Executive", "Gigabit", "Colour Screen"],
        source="https://com1pbx.com/product/ip-phone-fanvil-fanvil-x4",
        description=(
            "The X4 family is a dependable mid-range desk phone, with the X4G adding "
            "gigabit networking for bandwidth-heavy sites."
        ),
        highlights=["Colour display", "DSS keys", "Gigabit option"],
    ),
    p(
        slug="fanvil-h601",
        name="Fanvil H601",
        brand="Fanvil",
        category="ip-phones",
        image=IMG + "/ip_phone/fanvil/SP1145.webp",
        summary="Hotel phone designed for guest rooms.",
        tags=["Hotel", "Basic", "No Display"],
        source="https://com1pbx.com/product/ip-phone-fanvil-fanvil-h601",
        description=(
            "A purpose-built hotel room phone - simple keys, a familiar handset and the "
            "durability a guest room demands."
        ),
        highlights=["Hotel form factor", "Simple keypad", "SIP-based"],
    ),
    p(
        slug="fanvil-h603w",
        name="Fanvil H603W",
        brand="Fanvil",
        category="ip-phones",
        image=IMG + "/ip_phone/fanvil/SP1146.webp",
        summary="Wi-Fi hotel phone for guest rooms.",
        tags=["Hotel", "Wi-Fi"],
        source="https://com1pbx.com/product/ip-phone-fanvil-fanvil-h603w",
        description="The wireless variant of Fanvil's hotel room phone, for properties without in-room data cabling.",
        highlights=["Hotel form factor", "Wi-Fi", "SIP-based"],
    ),
    # --------------------------------------------------------- Grandstream
    p(
        slug="grandstream-grp2670",
        name="Grandstream GRP2670 Professional IP Phone",
        brand="Grandstream",
        category="ip-phones",
        image=IMG + "/ip_phone/grandstream/SP1077.webp",
        summary="Executive desk phone from the GRP professional series.",
        tags=["Executive", "Gigabit", "Bluetooth"],
        source="https://com1pbx.com/product/ip-phone-grandstream-grp-2670",
        description=(
            "The top of Grandstream's GRP professional range, for executives and busy "
            "operator positions."
        ),
        highlights=["Executive build", "Gigabit networking", "Multiple SIP accounts"],
    ),
    p(
        slug="grandstream-grp2611g",
        name="Grandstream GRP2611G Professional IP Phone",
        brand="Grandstream",
        category="ip-phones",
        image=IMG + "/ip_phone/grandstream/SP1108.webp",
        summary="Gigabit desk phone with a colour display.",
        tags=["Executive", "Gigabit", "Colour Screen"],
        source="https://com1pbx.com/product/ip-phone-grandstream-grp2611g",
        description=(
            "A gigabit GRP model for offices standardising on Grandstream without "
            "stepping up to the flagship."
        ),
        highlights=["Gigabit ports", "Colour display", "PoE"],
    ),
    p(
        slug="grandstream-grp2612pwg",
        name="Grandstream GRP2612PWG Professional IP Phone",
        brand="Grandstream",
        category="ip-phones",
        image=IMG + "/ip_phone/grandstream/SP1107.webp",
        summary="Mid-range GRP phone with wireless connectivity.",
        tags=["Wi-Fi", "Gigabit", "Bluetooth"],
        source="https://com1pbx.com/product/ip-phone-grandstream-grp-2612-pwg",
        description="A mid-range GRP model with integrated wireless for flexible desks.",
        highlights=["Integrated Wi-Fi", "Gigabit", "Colour display"],
    ),
    p(
        slug="grandstream-grp2603p",
        name="Grandstream GRP2603P Professional IP Phone",
        brand="Grandstream",
        category="ip-phones",
        image=IMG + "/ip_phone/grandstream/SP1111.webp",
        summary="Entry professional phone, ideal for volume rollouts.",
        tags=["Basic", "PoE"],
        source="https://com1pbx.com/product/ip-phone-grandstream-grp2603p",
        description=(
            "A low-cost GRP model that keeps Grandstream provisioning and management "
            "consistent across a large rollout."
        ),
        highlights=["PoE", "Programmable keys", "Volume rollout friendly"],
    ),
    p(
        slug="grandstream-grp2602pwg",
        name="Grandstream GRP2602PWG Professional IP Phone",
        brand="Grandstream",
        category="ip-phones",
        image=IMG + "/ip_phone/grandstream/SP1112.webp",
        summary="Entry GRP phone with wireless.",
        tags=["Basic", "Wi-Fi"],
        source="https://com1pbx.com/product/ip-phone-grandstream-grp-2602pwg",
        description="The wireless entry model in Grandstream's GRP range.",
        highlights=["Integrated Wi-Fi", "PoE", "Entry price point"],
    ),
    # --------------------------------------------------- GSM gateways
    p(
        slug="dinstar-uc2000-ve-4",
        name="Dinstar UC2000-VE 4 Port GSM/VoLTE Gateway",
        brand="Dinstar",
        category="gsm-gateways",
        image=IMG + "/gsm_gateway/dinstar/SP1016.webp",
        summary="4-port GSM / VoLTE gateway for small branch connectivity.",
        tags=["4 Ports", "GSM", "VoLTE"],
        source="https://com1pbx.com/product/gsm-gateway-dinstar-uc2000-ve-4-port",
        description=(
            "A 4-port GSM/VoLTE gateway that terminates mobile trunks onto SIP, for "
            "branches that need PSTN reach without a landline."
        ),
        highlights=["4 GSM / VoLTE ports", "SIP trunk termination", "Rack or desktop"],
        specs=[("Ports", "4"), ("Network", "GSM / VoLTE"), ("Upstream", "SIP")],
    ),
    p(
        slug="dinstar-uc2000-ve-8",
        name="Dinstar UC2000-VE 8 Port GSM/VoLTE Gateway",
        brand="Dinstar",
        category="gsm-gateways",
        image=IMG + "/gsm_gateway/dinstar/SP1017.webp",
        summary="8-port GSM / VoLTE gateway for growing sites.",
        tags=["8 Ports", "GSM", "VoLTE"],
        source="https://com1pbx.com/product/gsm-gateway-dinstar-uc2000-ve-8-port",
        description=(
            "The 8-port variant of the UC2000-VE, doubling mobile trunk capacity "
            "without changing the deployment pattern."
        ),
        highlights=["8 GSM / VoLTE ports", "SIP trunk termination", "Central management"],
        specs=[("Ports", "8"), ("Network", "GSM / VoLTE"), ("Upstream", "SIP")],
    ),
    p(
        slug="dinstar-uc2000-vf-8",
        name="Dinstar UC2000-VF 8 Port GSM/VoLTE Gateway",
        brand="Dinstar",
        category="gsm-gateways",
        image=IMG + "/gsm_gateway/dinstar/SP1018.webp",
        summary="8-port GSM / VoLTE gateway from the modular VF series.",
        tags=["8 Ports", "GSM", "VoLTE", "Expandable"],
        source="https://com1pbx.com/product/gsm-gateway-dinstar-uc2000-vf",
        description=(
            "The VF series gateway with 8 ports, part of the modular UC2000 family "
            "Com1 supplies for GSM trunking."
        ),
        highlights=["8 GSM / VoLTE ports", "Modular family", "SIP trunk termination"],
        specs=[("Ports", "8"), ("Network", "GSM / VoLTE"), ("Series", "UC2000-VF")],
    ),
    p(
        slug="dinstar-uc2000-vf-16",
        name="Dinstar UC2000-VF 16 Port GSM/VoLTE Gateway",
        brand="Dinstar",
        category="gsm-gateways",
        image=IMG + "/gsm_gateway/dinstar/SP1019.webp",
        summary="16-port GSM / VoLTE gateway for high-density trunking.",
        tags=["16 Ports", "GSM", "VoLTE"],
        source="https://com1pbx.com/product/gsm-gateway-dinstar-uc2000-vf-16port",
        description=(
            "Sixteen mobile ports in a single chassis - the usual choice for call "
            "centres running high outbound volume over GSM."
        ),
        highlights=["16 GSM / VoLTE ports", "High-density trunking", "Central management"],
        specs=[("Ports", "16"), ("Network", "GSM / VoLTE"), ("Upstream", "SIP")],
    ),
    p(
        slug="dinstar-uc2000-vf-16-simbank",
        name="Dinstar UC2000-VF 16 Port GSM/LTE with SIM Bank",
        brand="Dinstar",
        category="gsm-gateways",
        image=IMG + "/gsm_gateway/dinstar/SP1068.webp",
        summary="16-port GSM/LTE gateway paired with a remote SIM bank.",
        tags=["16 Ports", "SIM Bank", "LTE"],
        source="https://com1pbx.com/product/gsm-gateway-dinstar-uc2000-vf-16-simbank",
        description=(
            "Combines the 16-port gateway with a SIM bank, so SIMs can be held in a "
            "secure location while the radios sit elsewhere."
        ),
        highlights=["16 GSM / LTE ports", "Remote SIM bank", "Centralised SIM security"],
        specs=[("Ports", "16"), ("Network", "GSM / LTE"), ("Option", "SIM bank")],
    ),
    p(
        slug="dinstar-uc2000-vg-32-simbank",
        name="Dinstar UC2000-VG 32 Port GSM/LTE with SIM Bank",
        brand="Dinstar",
        category="gsm-gateways",
        image=IMG + "/gsm_gateway/dinstar/SP1069.webp",
        summary="32-port GSM/LTE gateway with a SIM bank.",
        tags=["32 Ports", "SIM Bank", "LTE"],
        source="https://com1pbx.com/product/gsm-gateway-dinstar-uc2000-vg-32-simbank",
        description="The largest SIM-bank configuration Com1 lists, for enterprise outbound operations.",
        highlights=["32 GSM / LTE ports", "Remote SIM bank", "Enterprise scale"],
        specs=[("Ports", "32"), ("Network", "GSM / LTE"), ("Option", "SIM bank")],
    ),
    p(
        slug="dinstar-uc2000-vg-32",
        name="Dinstar UC2000-VG 32 Port GSM/VoLTE Gateway",
        brand="Dinstar",
        category="gsm-gateways",
        image=IMG + "/gsm_gateway/dinstar/SP1070.webp",
        summary="32-port GSM / VoLTE gateway for the largest deployments.",
        tags=["32 Ports", "GSM", "VoLTE"],
        source="https://com1pbx.com/product/gsm-gateway-dinstar-uc2000-vf-32-port",
        description=(
            "The largest member of the UC2000 family Com1 lists - 32 mobile ports for "
            "enterprise-scale outbound operations."
        ),
        highlights=["32 GSM / VoLTE ports", "Enterprise scale", "Central management"],
        specs=[("Ports", "32"), ("Network", "GSM / VoLTE"), ("Upstream", "SIP")],
    ),
    # --------------------------------------------------------- FXO gateways
    p(
        slug="dinstar-dag1000-1s1o",
        name="Dinstar DAG1000-1S1O",
        brand="Dinstar",
        category="fxo-gateways",
        image=IMG + "/fxo_gateway/dinstar/SP1121.webp",
        summary="One FXS and one FXO port in a compact gateway.",
        tags=["1 Port", "FXO", "FXS"],
        source="https://com1pbx.com/product/fxo-gateway-dinstar-dag1000-1s1o",
        description=(
            "A combined FXS/FXO gateway for a single analogue line and a single "
            "analogue phone - the smallest way to put a legacy line onto SIP."
        ),
        highlights=["1 FXO port", "1 FXS port", "SIP uplink"],
        specs=[("FXO ports", "1"), ("FXS ports", "1"), ("Upstream", "SIP")],
    ),
    p(
        slug="dinstar-dag1000-2o",
        name="Dinstar DAG1000-2O",
        brand="Dinstar",
        category="fxo-gateways",
        image=IMG + "/fxo_gateway/dinstar/SP1027.webp",
        summary="Two FXO ports for two analogue lines.",
        tags=["2 Ports", "FXO"],
        source="https://com1pbx.com/product/fxo-gateway-dinstar-dag1000-2o",
        description="Terminates two analogue PSTN lines onto the IP PBX.",
        highlights=["2 FXO ports", "SIP uplink", "Compact chassis"],
        specs=[("FXO ports", "2"), ("Upstream", "SIP")],
    ),
    p(
        slug="dinstar-dag1000-2s2o",
        name="Dinstar DAG1000-2S2O",
        brand="Dinstar",
        category="fxo-gateways",
        image=IMG + "/fxo_gateway/dinstar/SP1122.webp",
        summary="Two FXS and two FXO ports in one unit.",
        tags=["2 Ports", "FXO", "FXS"],
        source="https://com1pbx.com/product/fxo-gateway-dinstar-dag1000-2s2o",
        description="Mixed FXS/FXO gateway for two analogue lines and two analogue phones.",
        highlights=["2 FXO ports", "2 FXS ports", "SIP uplink"],
        specs=[("FXO ports", "2"), ("FXS ports", "2"), ("Upstream", "SIP")],
    ),
    p(
        slug="dinstar-dag1000-4o",
        name="Dinstar DAG1000-4O",
        brand="Dinstar",
        category="fxo-gateways",
        image=IMG + "/fxo_gateway/dinstar/SP1028.webp",
        summary="Four FXO ports for branch PSTN connectivity.",
        tags=["4 Ports", "FXO"],
        source="https://com1pbx.com/product/fxo-gateway-dinstar-dag1000-4o",
        description="A four-line FXO gateway for branches replacing an EPABX with SIP.",
        highlights=["4 FXO ports", "SIP uplink", "Rack mountable"],
        specs=[("FXO ports", "4"), ("Upstream", "SIP")],
    ),
    p(
        slug="dinstar-dag1000-4s4o",
        name="Dinstar DAG1000-4S4O",
        brand="Dinstar",
        category="fxo-gateways",
        image=IMG + "/fxo_gateway/dinstar/SP1123.webp",
        summary="Four FXS and four FXO ports in one gateway.",
        tags=["4 Ports", "FXO", "FXS"],
        source="https://com1pbx.com/product/fxo-gateway-dinstar-dag1000-4s4o",
        description="Mixed gateway for four analogue lines and four analogue handsets.",
        highlights=["4 FXO ports", "4 FXS ports", "SIP uplink"],
        specs=[("FXO ports", "4"), ("FXS ports", "4"), ("Upstream", "SIP")],
    ),
    p(
        slug="dinstar-dag1000-8o",
        name="Dinstar DAG1000-8O",
        brand="Dinstar",
        category="fxo-gateways",
        image=IMG + "/fxo_gateway/dinstar/SP1029.webp",
        summary="Eight FXO ports for larger analogue estates.",
        tags=["8 Ports", "FXO"],
        source="https://com1pbx.com/product/fxo-gateway-dinstar-dag1000-8o",
        description="Eight analogue lines onto SIP, for sites with a full PSTN bank.",
        highlights=["8 FXO ports", "SIP uplink", "Central management"],
        specs=[("FXO ports", "8"), ("Upstream", "SIP")],
    ),
    p(
        slug="dinstar-dag2000-16o",
        name="Dinstar DAG2000-16O",
        brand="Dinstar",
        category="fxo-gateways",
        image=IMG + "/fxo_gateway/dinstar/SP1120.webp",
        summary="Sixteen FXO ports in the DAG2000 chassis.",
        tags=["16 Ports", "FXO"],
        source="https://com1pbx.com/product/fxo-gateway-dinstar-dag2000-16o",
        description="High-density analogue line termination for call centres and campuses.",
        highlights=["16 FXO ports", "SIP uplink", "Rack chassis"],
        specs=[("FXO ports", "16"), ("Upstream", "SIP")],
    ),
    p(
        slug="dinstar-dag2000-8s8o",
        name="Dinstar DAG2000-8S8O",
        brand="Dinstar",
        category="fxo-gateways",
        image=IMG + "/fxo_gateway/dinstar/SP1124.webp",
        summary="Eight FXS and eight FXO ports in one unit.",
        tags=["16 Ports", "FXO", "FXS"],
        source="https://com1pbx.com/product/fxo-gateway-dinstar-dag2000-8s8o",
        description="Mixed 8+8 gateway for sites keeping both analogue lines and analogue phones.",
        highlights=["8 FXO ports", "8 FXS ports", "SIP uplink"],
        specs=[("FXO ports", "8"), ("FXS ports", "8"), ("Upstream", "SIP")],
    ),
    p(
        slug="dinstar-dag3000-32",
        name="Dinstar DAG3000-32S/O",
        brand="Dinstar",
        category="fxo-gateways",
        image=IMG + "/fxo_gateway/dinstar/SP1125.webp",
        summary="32-port mixed FXS/FXO gateway for large sites.",
        tags=["32 Ports", "FXO", "FXS"],
        source="https://com1pbx.com/product/fxo-gateway-dinstar-dag3000-32s/o",
        description="The largest analogue gateway Com1 lists, in a 32-port mixed configuration.",
        highlights=["32 ports total", "Mixed FXS / FXO", "Enterprise scale"],
        specs=[("Ports", "32 total"), ("Mix", "FXS and FXO"), ("Upstream", "SIP")],
    ),
    # --------------------------------------------------------- FXS gateways
    p(
        slug="dinstar-dag1000-1s",
        name="Dinstar DAG1000-1S",
        brand="Dinstar",
        category="fxs-gateways",
        image=IMG + "/fxs_gateway/dinstar/SP1020.webp",
        summary="Single FXS port gateway for one analogue phone.",
        tags=["1 Port", "FXS"],
        source="https://com1pbx.com/product/fxs-gateway-dinstar-dag1000-1s",
        description="Connects one analogue telephone to the IP PBX - useful for a lift phone, fax or single legacy handset.",
        highlights=["1 FXS port", "SIP uplink", "Compact"],
        specs=[("FXS ports", "1"), ("Upstream", "SIP")],
    ),
    p(
        slug="dinstar-dag1000-2s",
        name="Dinstar DAG1000-2S",
        brand="Dinstar",
        category="fxs-gateways",
        image=IMG + "/fxs_gateway/dinstar/SP1021.webp",
        summary="Two FXS ports for analogue handsets.",
        tags=["2 Ports", "FXS"],
        source="https://com1pbx.com/product/fxs-gateway-dinstar-dag1000-2s",
        description="Two analogue extensions on the IP platform.",
        highlights=["2 FXS ports", "SIP uplink", "Compact"],
        specs=[("FXS ports", "2"), ("Upstream", "SIP")],
    ),
    p(
        slug="dinstar-dag1000-4s",
        name="Dinstar DAG1000-4S",
        brand="Dinstar",
        category="fxs-gateways",
        image=IMG + "/fxs_gateway/dinstar/SP1022.webp",
        summary="Four FXS ports for analogue extensions.",
        tags=["4 Ports", "FXS"],
        source="https://com1pbx.com/product/fxs-gateway-dinstar-dag1000-4s",
        description="Keeps four analogue phones in service after an EPABX replacement.",
        highlights=["4 FXS ports", "SIP uplink", "Rack mountable"],
        specs=[("FXS ports", "4"), ("Upstream", "SIP")],
    ),
    p(
        slug="dinstar-dag1000-4s-ge",
        name="Dinstar DAG1000-4S (GE)",
        brand="Dinstar",
        category="fxs-gateways",
        image=IMG + "/fxs_gateway/dinstar/SP1116.webp",
        summary="Four FXS ports with gigabit networking.",
        tags=["4 Ports", "FXS", "Gigabit"],
        source="https://com1pbx.com/product/fxs-gateway-dinstar-dag1000-4s-ge",
        description="The gigabit-equipped version of the 4-port FXS gateway.",
        highlights=["4 FXS ports", "Gigabit uplink", "SIP"],
        specs=[("FXS ports", "4"), ("Network", "Gigabit"), ("Upstream", "SIP")],
    ),
    p(
        slug="dinstar-dag1000-8s",
        name="Dinstar DAG1000-8S",
        brand="Dinstar",
        category="fxs-gateways",
        image=IMG + "/fxs_gateway/dinstar/SP1023.webp",
        summary="Eight FXS ports for analogue extensions.",
        tags=["8 Ports", "FXS"],
        source="https://com1pbx.com/product/fxs-gateway-dinstar-dag1000-8s",
        description="Eight analogue extensions on one gateway.",
        highlights=["8 FXS ports", "SIP uplink", "Central management"],
        specs=[("FXS ports", "8"), ("Upstream", "SIP")],
    ),
    p(
        slug="dinstar-dag1000-8s-ge",
        name="Dinstar DAG1000-8S (GE)",
        brand="Dinstar",
        category="fxs-gateways",
        image=IMG + "/fxs_gateway/dinstar/SP1117.webp",
        summary="Eight FXS ports with gigabit networking.",
        tags=["8 Ports", "FXS", "Gigabit"],
        source="https://com1pbx.com/product/fxs-gateway-dinstar-dag1000-8s-ge",
        description="The gigabit-equipped version of the 8-port FXS gateway.",
        highlights=["8 FXS ports", "Gigabit uplink", "SIP"],
        specs=[("FXS ports", "8"), ("Network", "Gigabit"), ("Upstream", "SIP")],
    ),
    p(
        slug="dinstar-dag2000-16s",
        name="Dinstar DAG2000-16S",
        brand="Dinstar",
        category="fxs-gateways",
        image=IMG + "/fxs_gateway/dinstar/SP1024.webp",
        summary="Sixteen FXS ports in the DAG2000 chassis.",
        tags=["16 Ports", "FXS"],
        source="https://com1pbx.com/product/fxs-gateway-dinstar-dag2000-16s",
        description="Sixteen analogue extensions for campuses and hotels.",
        highlights=["16 FXS ports", "SIP uplink", "Rack chassis"],
        specs=[("FXS ports", "16"), ("Upstream", "SIP")],
    ),
    p(
        slug="dinstar-dag2000-24s",
        name="Dinstar DAG2000-24S",
        brand="Dinstar",
        category="fxs-gateways",
        image=IMG + "/fxs_gateway/dinstar/SP1025.webp",
        summary="Twenty-four FXS ports for larger analogue estates.",
        tags=["24 Ports", "FXS"],
        source="https://com1pbx.com/product/fxs-gateway-dinstar-dag2000-24s",
        description="Twenty-four analogue extensions on a single SIP-attached chassis.",
        highlights=["24 FXS ports", "SIP uplink", "Rack chassis"],
        specs=[("FXS ports", "24"), ("Upstream", "SIP")],
    ),
    p(
        slug="dinstar-dag2000-32s",
        name="Dinstar DAG2000-32S",
        brand="Dinstar",
        category="fxs-gateways",
        image=IMG + "/fxs_gateway/dinstar/SP1026.webp",
        summary="Thirty-two FXS ports in one chassis.",
        tags=["32 Ports", "FXS"],
        source="https://com1pbx.com/product/fxs-gateway-dinstar-dag2000-32s",
        description="The largest single-chassis FXS count Com1 lists in the DAG2000 family.",
        highlights=["32 FXS ports", "SIP uplink", "Enterprise scale"],
        specs=[("FXS ports", "32"), ("Upstream", "SIP")],
    ),
    p(
        slug="dinstar-dag2500",
        name="Dinstar DAG2500",
        brand="Dinstar",
        category="fxs-gateways",
        image=IMG + "/fxs_gateway/dinstar/SP1118.webp",
        summary="Modular analogue gateway for mixed deployments.",
        tags=["Expandable", "FXS"],
        source="https://com1pbx.com/product/fxs-gateway-dinstar-dag2500",
        description="A modular analogue gateway that scales port count by adding boards rather than units.",
        highlights=["Modular port boards", "SIP uplink", "Rack chassis"],
    ),
    p(
        slug="dinstar-dag3000",
        name="Dinstar DAG3000",
        brand="Dinstar",
        category="fxs-gateways",
        image=IMG + "/fxs_gateway/dinstar/SP1119.webp",
        summary="High-density modular gateway for large analogue estates.",
        tags=["Expandable", "FXS", "FXO"],
        source="https://com1pbx.com/product/fxs-gateway-dinstar-dag3000",
        description="The high-density member of the DAG family, for large analogue estates migrating to SIP.",
        highlights=["High port density", "Mixed FXS / FXO options", "SIP uplink"],
    ),
]

PRODUCTS_BY_SLUG = {item["slug"]: item for item in PRODUCTS}
CATEGORIES_BY_SLUG = {item["slug"]: item for item in CATEGORIES}


def category_counts():
    counts = {}
    for item in PRODUCTS:
        counts[item["category"]] = counts.get(item["category"], 0) + 1
    return counts


def brand_counts():
    counts = {}
    for item in PRODUCTS:
        counts[item["brand"]] = counts.get(item["brand"], 0) + 1
    return counts
