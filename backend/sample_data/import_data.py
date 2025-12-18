#!/usr/bin/env python3
"""
Script to import sample data into MongoDB.
Usage: python import_data.py
"""

import json
import os
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure

# MongoDB connection settings
MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DATABASE_NAME = os.getenv("DATABASE_NAME", "university_catalog")


def load_json_file(filename):
    """Load JSON data from file."""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(script_dir, filename)

    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)


def import_data():
    """Import sample data into MongoDB."""
    print(f"Connecting to MongoDB: {MONGODB_URL}")

    try:
        client = MongoClient(MONGODB_URL, serverSelectionTimeoutMS=5000)
        # Test connection
        client.server_info()
        print("✓ Connected to MongoDB successfully")
    except ConnectionFailure as e:
        print(f"✗ Failed to connect to MongoDB: {e}")
        print("\nMake sure MongoDB is running:")
        print("  - Windows: Start MongoDB service")
        print("  - Docker: docker run -d -p 27017:27017 mongo:latest")
        return False

    db = client[DATABASE_NAME]
    print(f"Using database: {DATABASE_NAME}")

    # Import specialties
    print("\n[1/2] Importing specialties...")
    try:
        specialties = load_json_file('specialties.json')

        # Clear existing data (optional - comment out to preserve data)
        db.specialties.delete_many({})
        print("  - Cleared existing specialties")

        result = db.specialties.insert_many(specialties)
        print(f"  ✓ Imported {len(result.inserted_ids)} specialties")

        # Display sample
        print("\n  Sample specialties:")
        for spec in db.specialties.find().limit(3):
            print(f"    - {spec['name']} ({spec['category']})")

    except FileNotFoundError:
        print("  ✗ specialties.json not found")
        return False
    except Exception as e:
        print(f"  ✗ Error importing specialties: {e}")
        return False

    # Import universities
    print("\n[2/2] Importing universities...")
    try:
        universities = load_json_file('universities.json')

        # Clear existing data (optional - comment out to preserve data)
        db.universities.delete_many({})
        print("  - Cleared existing universities")

        result = db.universities.insert_many(universities)
        print(f"  ✓ Imported {len(result.inserted_ids)} universities")

        # Display sample
        print("\n  Sample universities:")
        for uni in db.universities.find().limit(5):
            print(f"    - {uni['name']} ({uni['country']}) - Rank {uni['ranking']}")

    except FileNotFoundError:
        print("  ✗ universities.json not found")
        return False
    except Exception as e:
        print(f"  ✗ Error importing universities: {e}")
        return False

    # Statistics
    print("\n" + "="*60)
    print("IMPORT SUMMARY")
    print("="*60)

    total_specialties = db.specialties.count_documents({})
    total_universities = db.universities.count_documents({})

    print(f"Total specialties: {total_specialties}")
    print(f"Total universities: {total_universities}")

    # Count universities by country
    print("\nUniversities by country:")
    pipeline = [
        {"$group": {"_id": "$country", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    for doc in db.universities.aggregate(pipeline):
        print(f"  - {doc['_id']}: {doc['count']}")

    # Count specialties by category
    print("\nSpecialties by category:")
    pipeline = [
        {"$group": {"_id": "$category", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}}
    ]
    for doc in db.specialties.aggregate(pipeline):
        print(f"  - {doc['_id']}: {doc['count']}")

    print("\n" + "="*60)
    print("✓ Import completed successfully!")
    print("="*60)

    print("\nYou can now test the API:")
    print("  curl http://localhost:8000/api/universities")
    print("  curl http://localhost:8000/api/specialties")
    print("  curl 'http://localhost:8000/api/universities?country=USA'")

    client.close()
    return True


if __name__ == "__main__":
    print("="*60)
    print("UNIVERSITY CATALOG - DATA IMPORT")
    print("="*60)

    success = import_data()

    if not success:
        print("\n✗ Import failed")
        exit(1)
    else:
        print("\n✓ All done!")
        exit(0)
