app = Flask(__name__)

class ScoreCounter:
    def __init__(self):
        self.score = 0

    def increase_score(self):
        self.score += 1

    def get_score(self):
        return self.score

# Create an instance of ScoreCounter
score_counter = ScoreCounter()