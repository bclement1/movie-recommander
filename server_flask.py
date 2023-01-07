"""Flask server for movies recommendations."""
from typing import Dict
from flask import Flask, render_template, request
from sparql_queries import category_query

app = Flask(__name__)


@app.route("/", methods=["POST", "GET"])
def home():
    """Handle website's home page."""
    if request.method == "POST":
        # user entered its preferences, query DBpedia and return the result
        count = 1 # so far, only the first question is handled
        for category in request.form.values():
            if count > 1:
                continue
            query_res = category_query(category=category)
            headings = ["Title", "Abstract"]
            data = get_data_from_json(query_res)
            count += 1
        return render_template("answer.html", headings=headings, data=data)
    # else, keep the app running
    return render_template("home.html")


def get_data_from_json(json: Dict):
    """Parse the JSON file received from the query to DBpedia."""
    data = []
    for result in json["results"]["bindings"]: # iterate over matching movies
        movie_abstract = result["abstract"]["value"]
        movie_title = result["name"]["value"]
        data.append([movie_title, movie_abstract])
    return data


if __name__ == "__main__":
    app.run(debug=True)
