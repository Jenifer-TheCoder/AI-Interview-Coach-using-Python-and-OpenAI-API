import openai
from flask import Flask, request, jsonify

openai.api_key = 'YOUR_OPENAI_API_KEY'
def interview_coach(question):
    try:
        prompt = f"You are my programming expert, your job is to come with a precise answer to the '{question}' in the below format:\n1. Answer to the {question}\n2. Real Life Example\n3. Coding Solution/Example with line by line explanation\n4. Time & Space Efficiency Calculation"
        response = openai.ChatCompletion.create(
            model = "gpt-3.5-turbo",
            temperature = 0.9,
            top_p = 0.3,
            messages = [{'role': 'user', 'content': prompt}]
        )
        return response['choices'][0]['message']['content'].strip()
    except Exception as e:
        f"Error occured {e}"



app = Flask(__name__)
@app.route('/ask_question', methods= ['GET', 'POST'])

def ask_question() :
    if request.method == 'POST':
        print("Received Post request for ask_question")
    data = request.get_json()
    question = data.get('question')
    # Send the question to gpt model to retrieve answer
    answer = interview_coach(question)
    return jsonify({'answer': answer})
if __name__ == '__main__':
    app.run(port=5500, debug=True)