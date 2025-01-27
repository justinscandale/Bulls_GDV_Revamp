from scraper_grade_distributions import parse_grade_dist_page
from utils import save_to_csv

df = parse_grade_dist_page("http://localhost:8000/fall24/cop.html")
save_to_csv(df, "fall24")
