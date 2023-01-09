"""Generate and send SparQL queries to DBpedia API's SparQL endpoint."""
from SPARQLWrapper import SPARQLWrapper, JSON


def query_dbpedia(category: str, actor: str, time: str):
    """Query DBpedia using SparQL and return the result (JSON format)."""
    sparql = SPARQLWrapper("https://dbpedia.org/sparql")
    query_txt = generate_query_txt(category=category, actor=actor, time=time)
    print("SparQL query reads: \n{}".format(query_txt))
    sparql.setQuery(query_txt)
    sparql.setReturnFormat(JSON)
    query_res = sparql.query().convert()
    return query_res


def generate_query_txt(category: str, actor: str, time: str):
    """Return a SparQL query generated using the movie category specified by the user."""
    category = category.replace("-", "_")
    actor = actor.replace(" ", "_")
    # SELECT section
    query_txt = "SELECT DISTINCT ?film, ?abstract, ?name, ?run"
    # WHERE section
    query_txt += "\nWHERE\n{\n"
    query_txt += "?film dbo:wikiPageWikiLink dbr:{}_film .\n".format(category)
    query_txt += "?film rdfs:comment ?abstract .\n"
    query_txt += "?film dbp:name ?name . \n"
    query_txt += "?film dbo:runtime ?run . \n"
    query_txt += "?film dbo:starring dbr:{} . \n".format(actor)
    # Duration filter
    query_txt = query_time_filter(time=time, query_txt=query_txt)
    query_txt += "FILTER langMatches(lang(?abstract), 'en')\n"
    # End of WHERE section
    query_txt += "} LIMIT 10"
    return query_txt


def query_time_filter(time: str, query_txt: str):
    if time != "inf":
        time_float = float(time)
        query_txt += "FILTER( ?run <= {}) .\n".format(time_float * 3600)
    return query_txt
