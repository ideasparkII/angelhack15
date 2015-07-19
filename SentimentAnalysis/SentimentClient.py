import httplib2
from json import dumps
from urllib import urlencode
class PostSentiment:
    def __init__(self):
        self.conn = httplib2.Http()
    def getSentiment(self, text):
        url = "https://api.idolondemand.com/1/api/sync/analyzesentiment/v1"
        values = {'text':text,
                'apikey': "07a106d0-ff07-496b-a1b5-288b752da744"
                }
        resp, content = self.conn.request(url, 'POST', urlencode(values))
        print resp
        print content
def main():
    postSentiment = PostSentiment()
    postSentiment.getSentiment("I like cats")

if __name__ == "__main__":
    main()
