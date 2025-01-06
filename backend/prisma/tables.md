## **Instanciar para vizualizar**

**Users**

| id  | name   | email         | password | department_id |
| --- | ------ | ------------- | -------- | ------------- |
| 1   | Raquel | raq@email.com | 123      | 1             |
| 2   | Harley | har@email.com | 123      | 2             |
| 3   | Lucas  | luc@email.com | 123      | 3             |

**Department**s

| id  | name       |
| --- | ---------- |
| 1   | Vendas     |
| 2   | Engenharia |
| 3   | Sourcing   |

**Roles**

| id  | name      |
| --- | --------- |
| 1   | Criador   |
| 2   | Admin     |
| 3   | Aprovador |

**Permissions**

| id  | role_id | can_create | can_read | can_update | can_delete | can_approve |
| --- | ------- | ---------- | -------- | ---------- | ---------- | ----------- |
| 1   | 2       | TRUE       | TRUE     | TRUE       | TRUE       | TRUE        |
| 2   | 3       | FALSE      | TRUE     | FALSE      | FALSE      | TRUE        |
| 3   | 1       | TRUE       | TRUE     | TRUE       | TRUE       | FALSE       |

**Phases**

| id  | name        | description                     |
| --- | ----------- | ------------------------------- |
| 1   | CE          | Análise e cotação               |
| 2   | Planning    | Planejamento do proximos passos |
| 3   | Development | Desenvolvimento                 |

**User_roles**

| id  | user_id | role_id | phase_id |
| --- | ------- | ------- | -------- |
| 1   | 1       | 3       | 1        |
| 2   | 2       | 1       | 3        |
