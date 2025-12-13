import json
import os

# Data Transcription
emergency_contacts_data = [
    {
        "Organization/Service": "Franklin County Emergency Management & Homeland Security",
        "Phone Number": None,
        "Web Link": "https://fcemhs.org",
        "Notes": "Primary county emergency management agency"
    },
    {
        "Organization/Service": "Columbus Public Health",
        "Phone Number": None,
        "Web Link": "https://www.columbus.gov/publichealth",
        "Notes": "City public health emergency response"
    },
    {
        "Organization/Service": "National Response Center",
        "Phone Number": "1-800-424-8802",
        "Web Link": "https://nrc.uscg.mil",
        "Notes": "24/7 hazardous releases reporting"
    },
    {
        "Organization/Service": "Ohio EPA Spill Line",
        "Phone Number": "1-800-282-9378",
        "Web Link": "https://epa.ohio.gov/divisions-and-offices/emergency-response",
        "Notes": "24/7 spill and release reporting"
    },
    {
        "Organization/Service": "American Red Cross Central Ohio",
        "Phone Number": "614-253-2740 or 1-800-733-2767",
        "Web Link": "https://www.redcross.org/local/ohio/central-and-southern-ohio.html",
        "Notes": "24/7 disaster assistance"
    },
    {
        "Organization/Service": "FEMA Helpline",
        "Phone Number": "1-800-621-3362",
        "Web Link": "https://www.disasterassistance.gov",
        "Notes": "Federal disaster assistance"
    },
    {
        "Organization/Service": "211 Central Ohio",
        "Phone Number": "211",
        "Web Link": "https://211centralohio.org",
        "Notes": "Information and referral service"
    },
    {
        "Organization/Service": "Disaster Distress Helpline",
        "Phone Number": "1-800-985-5990",
        "Web Link": None,
        "Notes": "Crisis counseling for disaster-related stress"
    },
    {
        "Organization/Service": "Disaster Legal Services",
        "Phone Number": "888-534-1432",
        "Web Link": None,
        "Notes": "Free legal help for disaster survivors"
    }
]

flooding_programs_data = [
    # Preparedness & Prevention
    {
        "Program/Policy": "National Flood Insurance Program (NFIP)",
        "Web Link": "https://www.floodsmart.gov",
        "Phone Number": "(877) 336-2627",
        "Summary": "Provides flood insurance to property owners, renters, and businesses. Franklin County participates. Most homeowners insurance does NOT cover flood damage. Coverage up to $250,000 for buildings and $100,000 for contents.",
        "Jurisdiction": "Federal"
    },
    {
        "Program/Policy": "FEMA Flood Map Service Center",
        "Web Link": "https://msc.fema.gov",
        "Phone Number": None,
        "Summary": "Look up your address to learn flood risk and Special Flood Hazard Areas. Maps show flood zones, floodplain boundaries, and base flood elevations.",
        "Jurisdiction": "Federal"
    },
    {
        "Program/Policy": "Franklin County Floodplain Management",
        "Web Link": "https://www.franklincountyohio.gov/Business-Development/Development-Planning/Planning-Zoning/Floodplain",
        "Phone Number": None,
        "Summary": "Administers NFIP locally, sets minimum standards for floodplain development, and enforces regulations.",
        "Jurisdiction": "County"
    },
    {
        "Program/Policy": "Ohio Hazard Mitigation Plan",
        "Web Link": "https://ema.ohio.gov",
        "Phone Number": None,
        "Summary": "Statewide plan addressing flood hazards. 754 Ohio communities participate in NFIP with 23,661 policies covering $4.4 billion.",
        "Jurisdiction": "State"
    },
    # Response & Recovery
    {
        "Program/Policy": "FEMA Individual Assistance - Flood",
        "Web Link": "https://www.disasterassistance.gov",
        "Phone Number": "1-800-621-3362",
        "Summary": "After presidential disaster declaration, provides grants for temporary housing, home repairs, and expenses. Apply within 60 days.",
        "Jurisdiction": "Federal"
    },
    {
        "Program/Policy": "SBA Disaster Loans - Flood",
        "Web Link": "https://www.sba.gov/funding-programs/disaster-assistance",
        "Phone Number": None,
        "Summary": "Low-interest loans for uninsured flood losses to homeowners, renters, and businesses.",
        "Jurisdiction": "Federal"
    },
    {
        "Program/Policy": "Ohio Department of Insurance Toolkit",
        "Web Link": "https://insurance.ohio.gov",
        "Phone Number": None,
        "Summary": "Resources for flood recovery, insurance claims navigation, and financial preparedness.",
        "Jurisdiction": "State"
    },
    {
        "Program/Policy": "American Red Cross Flood Recovery",
        "Web Link": "https://www.redcross.org/local/ohio/central-and-southern-ohio.html",
        "Phone Number": "614-253-2740",
        "Summary": "Provides emergency shelter, food, health services, and recovery assistance.",
        "Jurisdiction": "Nonprofit"
    }
]

def clean_programs(data):
    cleaned = []
    for item in data:
        # Rename maps
        new_item = {
            "programName": item.get("Program/Policy"),
            "jurisdiction": item.get("Jurisdiction"),
            "webLink": item.get("Web Link"),
            "phoneNumber": item.get("Phone Number"),
            "summary": item.get("Summary"),
            "disasterType": "Flooding"
        }
        # Fill N/A
        for k, v in new_item.items():
            if v is None:
                new_item[k] = "N/A"
        cleaned.append(new_item)
    return cleaned

def clean_contacts(data):
    cleaned = []
    seen = set()
    for item in data:
        # Rename maps
        new_item = {
            "organization": item.get("Organization/Service"),
            "phoneNumber": item.get("Phone Number"),
            "webLink": item.get("Web Link"),
            "notes": item.get("Notes")
        }
        # Fill N/A
        for k, v in new_item.items():
            if v is None:
                new_item[k] = "N/A"
                
        # Deduplication check (convert to tuple of sorted items to be hashable)
        item_tuple = tuple(sorted(new_item.items()))
        if item_tuple not in seen:
            seen.add(item_tuple)
            cleaned.append(new_item)
            
    return cleaned

def main():
    cleaned_programs = clean_programs(flooding_programs_data)
    cleaned_contacts = clean_contacts(emergency_contacts_data)
    
    final_output = {
        "disasterPrograms": cleaned_programs,
        "emergencyContacts": cleaned_contacts
    }
    
    # Updated path to be absolute within workspace based on previous context
    # Note: Using absolute path to ensure correct placement
    output_path = r"C:\Users\munda\policy\server\data\policies.json"
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(final_output, f, indent=2, ensure_ascii=False)
        
    print(f"Successfully created {output_path}")

if __name__ == "__main__":
    main()
