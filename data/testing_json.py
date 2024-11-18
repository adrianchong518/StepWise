import pandas as pd
import json

filename = "data/Question Bank-1718.xlsx"
Questions = pd.read_excel(filename, sheet_name = "Questions")
Variables = pd.read_excel(filename, sheet_name = "Variables")
Steps = pd.read_excel(filename, sheet_name = "Steps")
Sample = pd.read_excel(filename, sheet_name = "Sample")
Sample_Steps = pd.read_excel(filename, sheet_name = "Sample_Steps")  
Concept = pd.read_excel(filename, sheet_name = "Concept")

# ================================================================================
# Questions 
question = {}

for index, row in Questions.iterrows():
    subject = f"{row['Subject']}_{row['Year']}_{row['Questions']}_{row['parts']}"
    nextId = f"{row['Subject']}_{row['Year']}_{row['Questions']}_{row['next part']}"

    questionId = index

    questionSubject = row['Subject']
    questionSource = {
        'kind': "HKDSE",
        'year': row['Year'],
    }
    questionNumber = row['Questions']
    questionPart = None if pd.isna(row['parts']) else row['parts']
    questionContent = row['Content']
    questionFigure = None if pd.isna(row['Photo']) else row['Photo'].replace('\\', '/')

    questionDetails = {
        'subject': "Mathematics",
        'source': questionSource,
        'number': questionNumber,
        'part': questionPart,
        'content': questionContent,
        'figure': questionFigure,
    }

    question[subject] = {
        'id': row['Subject'],
        'nextId': nextId,
        'details': questionDetails,
    }

# print(data)
# filename = 'Questions.json'
# with open(filename, 'w') as json_file:
#     json.dump(data, json_file, indent=4)

# print(f"Data has been written to {filename}")

# ================================================================================
# Variables
# data = {}

for _, row in Variables.iterrows():
    subject = f"{row['Subject']}_{row['Year']}_{row['Questions']}_{row['parts']}"

    if (subject not in question):
        question[subject] = {
            'variables': {}
        }
    elif 'variables' not in question[subject]:
        question[subject]['variables'] = {}
    
    question[subject]['variables'][row['Content']] = {
        'value': row['Value'],
        'given': row['Given'],
        'figure1': None if pd.isna(row['Photo1']) else row['Photo1'].replace('\\', '/'),
        'figure2': None if pd.isna(row['Photo2']) else row['Photo2'].replace('\\', '/'),
    }

# print(data)
# filename = 'Variables.json'
# with open(filename, 'w') as json_file:
#     json.dump(data, json_file, indent=4)

# print(f"Data has been written to {filename}")

# ================================================================================
# Steps
# data = {}

for _, row in Steps.iterrows():
    subject = f"{row['Subject']}_{row['Year']}_{row['Questions']}_{row['parts']}"

    if (subject not in question):
        question[subject] = {
            'steps': {}
        }
    elif 'steps' not in question[subject]:
        question[subject]['steps'] = {}

    stepsResponse = json.loads(row['Choices'].replace("'", '"').replace("\\", "\\\\"))
    response = None
    if row['Q Type'] == 'init':
        response = {
            'type': "option",
            'options': {
                'value': [v for v, _ in stepsResponse],
                'nextStep': [ns for _, ns in stepsResponse],
            }
        }
    elif row['Q Type'] == 'Method':
        response = {
            'type': "option",
            'options': {
                'value': [v for v, _ in stepsResponse],
                'nextStep': [ns for _, ns in stepsResponse],
            }
        }
    elif row['Q Type'] == 'Match':
        response = {
            'type': "multioption",
            'options': stepsResponse[0],
            'correctOptions': stepsResponse[1],
            'nextStep': stepsResponse[2],   
        }
    elif row['Q Type'] == 'Input':
        response = {
            'type': "number",
            'value': stepsResponse[0][0],
            'nextStep': stepsResponse[0][1],
        }
    elif row['Q Type'] == 'End':
        response = {
            'type': "end",
        }

    question[subject]['steps'][row['Step id']] = {
        'id': row['Step id'],
        'prompt': row['Questions'],
        'variables': json.loads(row['Variables'].replace("'", '"').replace("\\", "\\\\")),
        'response': response,
        'Sample Questions': row['Sample Questions'],
    }

# print(data)
filename = 'data/Questions.json'
with open(filename, 'w') as json_file:
    json.dump(question, json_file, indent=4)

print(f"Data has been written to {filename}")

# ================================================================================
# Sample
data = {}

for _, row in Sample.iterrows():
    subject = f"{row['Subject']}"
    if (subject not in data):
        data[subject] = {
            'sample': {}
        }
    elif 'sample' not in data[subject]:
        data[subject]['sample'] = {}

    data[subject]['sample'][row['ID']] = {
        'id': row['ID'],
        'subject': "Mathematics",
        'name': row['Skill set'],
        'question': row['Questions'],
        'figure': None if pd.isna(row['Photo']) else row['Photo'],
        'Concept': row['Concept'],
    }


# print(data)
# filename = 'Sample.json'
# with open(filename, 'w') as json_file:
#     json.dump(data, json_file, indent=4)

# print(f"Data has been written to {filename}")

# ================================================================================
# Sample_Steps
# data = {}

for _, row in Sample_Steps.iterrows():
    subject = f"{row['Subject']}"
    if (subject not in data):
        data[subject] = {
            'steps': {}
        }
    elif 'steps' not in data[subject]:
        data[subject]['steps'] = {}

    data[subject]['steps'][row['StepID']] = {
        'id': row['StepID'],
        'text': row['Steps'],
        'Photo': None if pd.isna(row['Photo']) else row['Photo'].replace('\\', '/'),
        'Links': json.loads(row['Links'].replace("'", '"').replace("\\", "\\\\")),
    }

# print(data)
filename = 'data/Sample.json'
with open(filename, 'w') as json_file:
    json.dump(data, json_file, indent=4)

print(f"Data has been written to {filename}")

# ================================================================================
# Concept
data = {}

for _, row in Concept.iterrows():
    subject = f"{row['Subject']}"
    if subject not in data:
        data[subject] = {
            'concept': {}
        }
    elif 'concept' not in data[subject]:
        data[subject]['concept'] = {}

    data[subject]['concept'][row['ID']] = {
        'id': row['ID'],
        'subject': "Mathematics",
        'name': row['Skill set'],
        'text': row['Desc'],
        'figure': None if pd.isna(row['Photo']) else row['Photo'].replace('\\', '/'),
    }

# print(data)
filename = 'data/Concept.json'
with open(filename, 'w') as json_file:
    json.dump(data, json_file, indent=4)

print(f"Data has been written to {filename}")