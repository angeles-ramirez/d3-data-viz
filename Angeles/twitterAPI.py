

api="Hgr2TlRxnBQwANqQv6lbAPdQK"
apiSecretKey="OjAgBxBOWOUcgAClfuw00KITmy1asnWwVC4DAdOtdDBtOZbtQ2"

import json

# Enter your keys/secrets as strings in the following fields
credentials = {}
credentials['CONSUMER_KEY'] = 'Hgr2TlRxnBQwANqQv6lbAPdQK'
credentials['CONSUMER_SECRET'] = 'OjAgBxBOWOUcgAClfuw00KITmy1asnWwVC4DAdOtdDBtOZbtQ2'
credentials['ACCESS_TOKEN'] = '1195204217041903616-Xk76aygVlQ2NjY15dZ5J6SVoGYpHrI'
credentials['ACCESS_SECRET'] = 'r3dkhipY2D3DsqcHGPEUCtsq1CjpbrRzu18odz33pzyxJ'

# Save the credentials object to file
with open("twitter_credentials.json", "w") as file:
    json.dump(credentials, file)