"""Generate and send SparQL queries to DBpedia API's SparQL endpoint."""
from SPARQLWrapper import SPARQLWrapper, JSON

def category_query(category: str):
    """Query DBpedia using SparQL and return the result (JSON format)."""
    sparql = SPARQLWrapper("https://dbpedia.org/sparql")
    query_txt = generate_query_txt(category)
    print("SparQL query reads: {}".format(query_txt))
    sparql.setQuery(query_txt)
    sparql.setReturnFormat(JSON)
    query_res = sparql.query().convert()
    return query_res


def generate_query_txt(category: str):
    """Return a SparQL query generated using the movie category specified by the user."""
    category = category.replace("-", "_")
    # SELECT section
    query_txt = "SELECT DISTINCT ?film, ?abstract, ?name"
    # WHERE section
    query_txt += "\nWHERE\n{\n"
    query_txt += "?film dbo:wikiPageWikiLink dbr:{}_film .\n".format(category)
    query_txt += "?film rdfs:comment ?abstract .\n"
    query_txt += "?film dbp:name ?name . \n"
    query_txt += "FILTER langMatches(lang(?abstract), 'en')\n"
    # End of WHERE section
    query_txt += "} LIMIT 5"
    return query_txt
