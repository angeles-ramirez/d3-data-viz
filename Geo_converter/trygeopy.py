#import geopy.geocoders
from geopy.geocoders import Nominatim
#geopy.geocoders.options.default_user_agent = 'my_app/1'
geolocator = Nominatim(user_agent="my_app/1")
location = geolocator.geocode("Tacoma, WA")
print(location.address)
print((location.latitude, location.longitude))