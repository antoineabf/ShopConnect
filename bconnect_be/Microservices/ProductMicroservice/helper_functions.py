def extract_auth_token(authenticated_request):
    auth_header = authenticated_request.headers.get('Authorization')
    if auth_header:
        return auth_header.split(" ")[1]
    else:
        return None

def levDistance(str1, str2):
    str1 = str1.name
    matrix = [[0 for x in range(len(str2) + 1)] for x in range(len(str1) + 1)]

    for i in range(len(str1) + 1):
        for j in range(len(str2) + 1):
            if i == 0:
                matrix[i][j] = j
            elif j == 0:
                matrix[i][j] = i
            elif str1[i-1] == str2[j-1]:
                matrix[i][j] = matrix[i-1][j-1]
            else:
                matrix[i][j] = 1 + min(matrix[i][j-1], matrix[i-1][j], matrix[i-1][j-1])    

    return matrix[len(str1)][len(str2)]

def suggest(dic, word, distance, maxSuggestions=5):
   return [i[1] for i in sorted([(distance(word1, word), word1) for word1 in dic if distance(word1, word) < 5], key=lambda x:(x[0], x[1].name))[:maxSuggestions]]
