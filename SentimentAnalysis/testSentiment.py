from iodpython.iodindex import IODClient

class SentimentAnalyser:
    def __init__(self):
        self.client = IODClient("http://api.idolondemand.com/","07a106d0-ff07-496b-a1b5-288b752da744")
        self.hashtags = {"#jeb": "Jeb Bush", "#clinton": "Hillary Clinton", "#trump": "Donald Trump", "#hilary": "Hillary Clinton", "#berniesanders": "Bernie Sanders"}
    def generateSentiment(self, text):
        r = self.client.post('analyzesentiment',{'text':text})
        docs = r.json()
        if(docs['aggregate']['score'] != 0):
            dictJson = {"candidate": self.getCandidate(text)}
            if docs['positive'] != []:
                for doc in docs['positive']:
                    dictJson[doc['topic']] = doc['score']
            if docs['negative'] != []:
                for doc in docs['negative']:
                    dictJson[doc['topic']] = doc['score']
            return dictJson
    def getCandidate(self, tweet):
        try:
            x = next(value for key, value in self.hashtags.iteritems() if key in tweet)
        except StopIteration:
            x = "Jeb Bush"               
        return x
def main():
    sent = SentimentAnalyser()
    sent.generateSentiment("#jeb I love cats and I love dogs and I hate PIGs")
if __name__ == "__main__":
    main()
