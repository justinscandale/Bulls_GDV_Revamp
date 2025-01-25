import csv

# Base URLs for scraping
GRADE_DIST_URL = "https://usfweb.usf.edu/dss/infocenter/?silverheader=&report_category=ADM&report_type=SGDIS&reportid=728576"
PROF_URL = "https://usfweb.usf.edu/dss/infocenter"

# Course Prefixes
COURSE_PREFIXES = [
    "ADE", "ADV", "AFA", "AFH", "AFR", "AMH", "AML", "AMS", "ANG", "ANS", "ANT", "APK", 
    "ARA", "ARC", "ARH", "ART", "ASL", "ASN", "AST", "ATR", "BCH", "BME", "BOT", "BSC", "BUL", 
    "CAI", "CAP", "CCJ", "CDA", "CEG", "CEN", "CES", "CGN", "CGS", "CHD", "CHI", "CHM", "CHS", 
    "CHT", "CIS", "CJC", "CJE", "CJL", "CLA", "CLP", "CLT", "CNT", "COM", "COP", "COT", "CPO", 
    "CRW", "CST", "CWR", "CYP", "DAA", "DAN", "DEP", "DIE", "DIG", "DPT", "DSC", "EAP", "EAS", 
    "ECH", "ECO", "ECP", "ECS", "ECT", "ECW", "EDA", "EDE", "EDF", "EDG", "EDH", "EDM", "EDP", 
    "EEC", "EEE", "EEL", "EES", "EEX", "EGI", "EGN", "EGS", "EIN", "EMA", "EME", "EML", "ENC", 
    "ENG", "ENL", "ENT", "ENV", "ENY", "ESC", "ESE", "ESI", "EUH", "EUS", "EVR", "EXP", "FIL", 
    "FIN", "FLE", "FOL", "FOS", "FOT", "FRE", "FRW", "FSS", "GEA", "GEB", "GEO", "GER", "GEW", 
    "GEY", "GIS", "GLY", "GMS", "GRA", "GRE", "GRW", "HFT", "HIM", "HIS", "HLP", "HMG", "HSA", 
    "HSC", "HUM", "HUN", "IDH", "IDS", "INP", "INR", "INT", "ISM", "ISS", "ITA", "ITT", "ITW", 
    "JOU", "JPN", "LAE", "LAH", "LAS", "LAT", "LDR", "LIN", "LIS", "LIT", "LNW", "MAA", "MAC", 
    "MAD", "MAE", "MAN", "MAP", "MAR", "MAS", "MAT", "MCB", "MEL", "MGF", "MHF", "MHS", "MLS", 
    "MMC", "MSL", "MTG", "MUC", "MUE", "MUG", "MUH", "MUL", "MUN", "MUO", "MUS", "MUT", "MVB", 
    "MVJ", "MVK", "MVO", "MVP", "MVS", "MVV", "MVW", "NEB", "NGR", "NSC", "NSP", "NUR", "OCB", 
    "OCC", "OCE", "OCG", "OCP", "ORI", "PAD", "PAS", "PCB", "PEM", "PET", "PGY", "PHA", "PHC", 
    "PHH", "PHI", "PHM", "PHP", "PHY", "PHZ", "POR", "POS", "POT", "PPE", "PSB", "PSC", "PSY", 
    "PUP", "PUR", "QMB", "RCS", "RED", "REE", "REL", "RLG", "RMI", "RTV", "RUS", "RUT", "SCE", 
    "SCM", "SDS", "SLS", "SMT", "SOP", "SOW", "SPA", "SPB", "SPC", "SPM", "SPN", "SPS", "SPW", 
    "SSE", "STA", "SYA", "SYD", "SYG", "SYO", "SYP", "TAX", "THE", "TPA", "TPP", "TSL", "TTE", 
    "URP", "URS", "VIC", "WOH", "WST", "ZOO"
]

# Save to CSV 
def save_to_csv(data, filename="output.csv"):
    """
    Saves a list of dictionaries to a CSV file.
    """
    if not data:
        print("No data to save.")
        return
    
    keys = data[0].keys()
    with open(filename, mode="w", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=keys)
        writer.writeheader()
        writer.writerows(data)
    print(f"Data saved to {filename}")

# Data Cleaning
def clean_text(text):
    text = re.sub(r'\s+', ' ', text)  # Collapse multiple spaces
    text = re.sub(r'[^\w\s]', '', text)  # Remove punctuation
    return text.strip()  # Remove leading/trailing spaces