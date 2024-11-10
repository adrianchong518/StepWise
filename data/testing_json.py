import pandas as pd
import json

Questions = pd.read_excel("Question Bank V17a.xlsx", sheet_name = "Questions")
Variables = pd.read_excel("Question Bank V17a.xlsx", sheet_name = "Variables")
Steps = pd.read_excel("Question Bank V17a.xlsx", sheet_name = "Steps")
Sample = pd.read_excel("Question Bank V17a.xlsx", sheet_name = "Sample")
Sample_Steps = pd.read_excel("Question Bank V17a.xlsx", sheet_name = "Sample_Steps")  
Concept = pd.read_excel("Question Bank V17a.xlsx", sheet_name = "Concept")  

# ================================================================================
# Questions
data = {}

for _, row in Questions.iterrows():
    subject = f"{row['Subject']}_{row['Year']}_{row['Questions']}_{row['parts']}"
    data[subject] = {
        'Subject': row['Subject'],
        'Content': row['Content'],
        'Photo': None if row['Photo'] == 'NO_PHOTO' else row['Photo'],
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
    if (subject not in data):
        data[subject] = {
            'var': {}
        }
    elif 'var' not in data[subject]:
        data[subject]['var'] = {}
    
    data[subject]['var'][row['Content']] = {
        'Given': row['Given'],
        'Value': row['Value'],
        'Photo1': None if row['Photo1'] == 'NO_PHOTO' else row['Photo1'],
        'Photo2': None if row['Photo2'] == 'NO_PHOTO' else row['Photo2'],
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
    if (subject not in data):
        data[subject] = {
            'steps': {}
        }
    elif 'steps' not in data[subject]:
        data[subject]['steps'] = {}

    data[subject]['steps'][row['Step id']] = {
        'Questions': row['Question'],
        'Variables': json.loads(row['Variables'].replace("'", '"').replace("\\", "\\\\")),
        'Choices': json.loads(row['Choices'].replace("'", '"').replace("\\", "\\\\")),
        'Sample Questions': row['Sample Questions'],
    }

# print(data)
filename = 'Questions.json'
with open(filename, 'w') as json_file:
    json.dump(data, json_file, indent=4)

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
        'Skill set': row['Skill set'],
        'Questions': row['Questions'],
        'Photo': None if row['Photo'] == 'NO_PHOTO' else row['Photo'],
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
        'step': row['Steps'],
        'Photo': None if row['Photo'] == 'NO_PHOTO' else row['Photo'],
        'Links': json.loads(row['Links'].replace("'", '"').replace("\\", "\\\\")),
    }

# print(data)
filename = 'Sample.json'
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
        'Skill set': row['Skill set'],
        'Desc': row['Desc'],
        'Photo': None if row['Photo'] == 'NO_PHOTO' else row['Photo'],
    }

# print(data)
filename = 'Concept.json'
with open(filename, 'w') as json_file:
    json.dump(data, json_file, indent=4)

print(f"Data has been written to {filename}")