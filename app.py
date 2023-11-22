import speedtest
import time
from pymongo import MongoClient

# Connect to MongoDB (make sure MongoDB is running)
client = MongoClient('mongodb://root:password@mongodb:27017/')
db = client['network_speed']
collection = db['speed_results']

def test_speed():
    st = speedtest.Speedtest()
    st.get_best_server()
    download_speed = st.download()
    upload_speed = st.upload()
    return download_speed, upload_speed

def save_to_mongodb(download_speed, upload_speed):
    result = {
        'timestamp': time.time(),
        'download_speed': download_speed,
        'upload_speed': upload_speed
    }
    collection.insert_one(result)

def main():
    while True:
        download_speed, upload_speed = test_speed()
        download_speed = round(download_speed / 1024 / 1024, 2)
        upload_speed = round(upload_speed / 1024 / 1024, 2)
        
        # Save to MongoDB
        save_to_mongodb(download_speed, upload_speed)
        print("Result saved to MongoDB.")

        # Sleep for 5 minutes (300 seconds)
        time.sleep(300)

if __name__ == "__main__":
    main()
