import json

f = open("plants.txt", "r")
data = {}
for line in f:
    arr =  line.split(",")
    name = arr[3]
    name = (name[1:-1]).lower()
    if name:
        #These characters shouldn't be in the common name
        if not "?" in name and not "&" in name and not "(" in name and not "1" in name and not "nom." in name and not "non" in name:
            if "hycrest" in name:
                name = "hycrest"
            if "ilima" in name:
                name = "'ilima"
            first_letter = name[0]

            if data.get(first_letter):
                (data[first_letter]).append(name)
            else:
                data[first_letter] = [name]

for letter in data:
    names = data[letter]
    unique_names = set(names) 
    data[letter] = sorted(unique_names)

data_j = json.dumps(data, sort_keys=True)

with open('common_names.json', 'w') as outfile:
    json.dump(data_j, outfile)
