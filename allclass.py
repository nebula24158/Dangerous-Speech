from flask import Flask, render_template

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

@app.route('/')
def index():
    return render_template('firstweb.html')  # Render the first page

@app.route('/quiz')
def quiz():
    return render_template('quiz.html', score=score_counter.get_score())

@app.route('/increase_score')
def increase_score():
    score_counter.increase_score()  # Increase the score
    return render_template('quiz.html', score=score_counter.get_score())  # Render the template with updated score

if __name__ == '__main__':
    app.run(debug=True)
