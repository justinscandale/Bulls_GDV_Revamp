import csv
import pandas as pd
import os

# Base URLs for scraping
GRADE_DIST_URL = "https://usfweb.usf.edu/dss/infocenter/?silverheader=&report_category=ADM&report_type=SGDIS&reportid=728576"
PROF_URL = "https://usfweb.usf.edu/dss/infocenter"

# Course Prefixes
_COURSE_PREFIXES = [
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

#Dict to store all data scraped
_course_data =   {
"Course_Prefix": None,
"Course_Num": None,
"Instruction_Type": None,
"CRN": None,
"A_Num": None,
"B_Num": None,
"C_Num": None,
"D_Num": None,
"F_Num": None,
"I_Num": None,
"S_Num": None,
"U_Num": None,
"W_Num": None,
"O_Num": None,
"Total_Grades": None,
"Course_Name": None, 
"Prof_Lname": None, 
"Prof_Fname": None 
}

#Check if a file exists
def file_exists(file_name):
    return os.path.exists(file_name)

# Save to CSV 
def save_to_csv(data_frame, filename):
    """
    Saves a pandas data frame to a CSV file.
    """
    if data_frame.empty:
        print("No data to save.")
        return
    
    full_file_name = "data/" + filename

    data_frame.to_csv(full_file_name, mode='a',index=False, header= not file_exists(full_file_name))
    print(f"Data saved to {full_file_name}")

# Data Cleaning
def clean_text(text):
    text = re.sub(r'\s+', ' ', text)  # Collapse multiple spaces
    text = re.sub(r'[^\w\s]', '', text)  # Remove punctuation
    return text.strip()  # Remove leading/trailing spaces