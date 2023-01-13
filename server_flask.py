"""Flask server for movies recommendations."""
from typing import Dict
from flask import Flask, render_template, request
import json
from sparql_queries import query_dbpedia

app = Flask(__name__)


@app.route("/", methods=["POST", "GET"])
def home():
    """Handle website's home page."""
    if request.method == "POST":
        # user entered its preferences, query DBpedia and return the result
        preferences = list(request.form.values())
        query_res = query_dbpedia(
            category=preferences[0], actor=preferences[1], time=preferences[2]
        )
        headings = ["Title", "Abstract"]
        data = get_data_from_json(query_res)
        """Pour test - Clément (fais office de placeholder pour l'instant)"""
        main_list = {
            "data": [
                {"title": "title1", "abstract": "abstract1", "img": None},
                {"title": "nicolas", "abstract": "abstract2", "img": None},
                {"title": "title3", "abstract": "abstract3", "img": None},
            ]
        }
        reco_list1 = {
            "data": [
                {"title": "title1", "abstract": "abstract1", "img": None},
                {"title": "nicolas", "abstract": "abstract2", "img": None},
                {"title": "title3", "abstract": "abstract3", "img": None},
            ]
        }
        reco_list2 = {
            "data": [
                {"title": "title1", "abstract": "abstract1", "img": None},
                {"title": "title2", "abstract": "abstract2", "img": None},
                {"title": "title3", "abstract": "abstract3", "img": None},
            ]
        }
        return render_template(
            "answer.html",
            headings=headings,
            data=data,
            name="answer",
            main_list=json.dumps(main_list),
            reco_list1=json.dumps(reco_list1),
            reco_list2=json.dumps(reco_list2),
        )
    # else, keep the app running
    return render_template("home.html", name="home")


def get_data_from_json(json: Dict):
    """Parse the JSON file received from the query to DBpedia."""
    data = []
    for result in json["results"]["bindings"]:  # iterate over matching movies
        movie_abstract = result["abstract"]["value"]
        movie_title = result["name"]["value"]
        data.append([movie_title, movie_abstract])
    return data


if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)
