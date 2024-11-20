
# **PortalMartins**  
**Plataforma Integrada de Informações Locais para Fomentar o Turismo e a Economia**

---

## **Sumário**

1. [Descrição do Projeto](#descrição-do-projeto)  
2. [Objetivos](#objetivos)  
3. [Setor de Aplicação](#setor-de-aplicação)  
4. [Requisitos](#requisitos)  
   - [Requisitos Funcionais](#requisitos-funcionais)  
   - [Requisitos Não Funcionais](#requisitos-não-funcionais)  
5. [Implementação](#implementação)  
6. [Imagens](#imagens)  
7. [API](#api)  
   - [User](#user)  
   - [Hosting](#hosting)  
   - [Feeding](#feeding)  
   - [Event](#event)  
   - [Image](#image)  

---

## **Descrição do Projeto**

O **PortalMartins** é uma plataforma web voltada para promover o turismo e a economia na cidade de **Martins - RN** e região. O sistema conecta moradores e visitantes, oferecendo informações sobre restaurantes, imóveis para aluguel/venda e eventos locais.  

Com foco em acessibilidade e usabilidade, a plataforma busca beneficiar moradores, empresários e turistas, criando um ecossistema colaborativo.  

---

## **Objetivos**

### **Principais Objetivos**  
- **Facilitar o acesso a informações locais:**  
  Criar uma interface intuitiva para acesso rápido e fácil a dados sobre estabelecimentos e eventos.  
- **Fomentar o engajamento comunitário:**  
  Incentivar a comunidade a colaborar, adicionando informações relevantes sobre seus negócios ou eventos.  

### **Alinhamento com os Objetivos de Desenvolvimento Sustentável ([ODS](https://brasil.un.org/pt-br/sdgs))**  
- **Trabalho decente e crescimento econômico**  
- **Cidades e comunidades sustentáveis**  

---

## **Setor de Aplicação**

A aplicação é voltada para a cidade de **Martins - RN** e adjacências, atendendo às seguintes áreas:  
- **Restaurantes e Alimentação:** Divulgação de opções gastronômicas.  
- **Hospedagem e Imóveis:** Imóveis para locação ou venda.  
- **Eventos Locais:** Promoção de eventos culturais, sociais e turísticos.  

---

## **Requisitos**

:hammer:: Em progresso

:ballot_box_with_check:: Feito

### **Requisitos Funcionais**  

| **Código** | **Título**            | **Descrição**                                                                                 |  
|:----------:|-----------------------|---------------------------------------------------------------------------------------------|  
| RF01       | Cadastro de Usuários  | Permitir que moradores e proprietários criem contas na plataforma :ballot_box_with_check:                          |  
| RF02       | Publicação de Posts   | Possibilitar o cadastro de restaurantes, hospedagens e eventos :ballot_box_with_check:                           |  
| RF03       | Listagem de Posts     | Exibir posts organizados por categorias :hammer:                                                    |  
| RF04       | Avaliação             | Permitir que usuários avaliem posts com classificações (estrelas) :hammer:                          |  
| RF05       | Gerenciamento         | Área administrativa para criar, editar e deletar posts :ballot_box_with_check:                                     |  

### **Requisitos Não Funcionais**  

| **Código** | **Título**          | **Descrição**                                                                                 |  
|:----------:|--------------------|---------------------------------------------------------------------------------------------|  
| RNF01      | Usabilidade         | Plataforma deve ser fácil de navegar para usuários de todas as idades :ballot_box_with_check:                      |  
| RNF02      | Mobilidade          | Design responsivo para acesso via desktop, tablets e smartphones :ballot_box_with_check:                          |  
| RNF03      | Desempenho          | Suporte a múltiplos usuários simultâneos, com alto desempenho em consultas e atualizações :hammer:  |  
| RNF04      | Segurança           | Implementação de segurança para proteger os dados dos usuários e estabelecimentos :ballot_box_with_check:           |  
| RNF05      | Acessibilidade      | Conformidade com diretrizes para garantir acesso a pessoas com deficiência :hammer:                |  

---

## **Implementação**

| **Componente**  | **Ferramenta Utilizada**  |  
|------------------|---------------------------|  
| Front-End        | Angular :ballot_box_with_check:                   |  
| Back-End         | C# (ASP.NET Core)  :ballot_box_with_check:       |  
| Banco de Dados   | PostgreSQL ou MongoDB :ballot_box_with_check:     |  
| Cache            | Redis          :hammer:           |  

---

## **Imagens**

### Arquitetura do Sistema  
<img src="ARCHITECTURE.jpeg" alt="Arquitetura do Sistema" height="500">

### Relacionamento entre Entidades  
<img src="RELATIONSHIP.jpeg" alt="Relacionamento entre Entidades" height="500">


---

## **API**

### **USER**

#### /users 
response(
    string Name,
    string CameFrom,
    string WhatIsIt,
    DateTime CreatedAt,
    DateTime UpdatedAt
)

#### /create
request(
    string Name, 
    string Email,
    string Password,
    string? CameFrom, 
    string? WhatIsIt
) => body

#### /login
request(
	string Email,
	string Password
) => body

response(
    string Name, 
    string Email, 
    string Token, 
    DateTime CreatedAt
)

#### /update/user
request(
	string? Name, 
	string? Email, 
	string? Password
) => body

#### /delete/user
request(
	string Password
) => body

---

### **HOSTING**

#### /get/hostings
response(
    int Id,
    string Title,
    string Location,
    string Phone,
    string Instagram,
    float Classification,
    string Description,
    string[] Images,
    int Bedrooms,
    int Bathroom,
    int Vacancy,
    bool ServiceArea,
    bool Kitchen,
    bool Garden,
    DateTime CreatedAt,
    DateTime UpdatedAt
)

#### /create/user/hosting
request(
    string Title,
    string Location,
    string? Phone,
    string? Instagram,
    string? Description,
    int Bedrooms,
    int Bathroom,
    int Vacancy,
    bool ServiceArea,
    bool Kitchen,
    bool Garden
)

#### /get/user/hostings
response(
    int Id,
    string Title,
    string Location,
    string Phone,
    string Instagram,
    float Classification,
    string Description,
    string[] Images,
    int Bedrooms,
    int Bathroom,
    int Vacancy,
    bool ServiceArea,
    bool Kitchen,
    bool Garden,
    DateTime CreatedAt,
    DateTime UpdatedAt
)

#### /update/user/hosting
request(
    int Id,
    string? Title,
    string? Location,
    string? Phone,
    string? Instagram,
    string? Description,
    int? Bedrooms,
    int? Bathroom,
    int? Vacancy,
    bool? ServiceArea,
    bool? Kitchen,
    bool? Garden
)

#### /delete/user/hosting/{id}

---

### **FEEDING**

#### /get/feedings
response(
    int Id,
    string Title,
    string Location,
    string Phone,
    string Instagram,
    float Classification,
    string Description,
    string[] Images,
    string Type,
    bool Wifi,
    bool Delivery,
    bool Parking,
    DateTime CreatedAt,
    DateTime UpdatedAt
)

#### /create/user/feeding
request(
    string Title,
    string Location,
    string? Phone,
    string? Instagram,
    string? Description,
    string Type,
    bool Wifi,
    bool Delivery,
    bool Parking
)

#### /get/user/feedings
response(
    int Id,
    string Title,
    string Location,
    string Phone,
    string Instagram,
    float Classification,
    string Description,
    string[] Images,
    string Type,
    bool Wifi,
    bool Delivery,
    bool Parking,
    DateTime CreatedAt,
    DateTime UpdatedAt
)

#### /update/user/feeding
request(
    int Id,
    string? Title,
    string? Location,
    string? Phone,
    string? Instagram,
    string? Description,
    string? Type,
    bool? Wifi,
    bool? Delivery,
    bool? Parking
)

#### /delete/user/feeding/{id}

---

### **EVENT**

#### /get/events
response(
    int Id,
    string Title,
    string Location,
    string Phone,
    string Instagram,
    float  Classification,
    string Description,
    string[] Images,
    DateTime EventDate,
    string EventLocation,
    DateTime CreatedAt,
    DateTime UpdatedAt
)

#### /create/user/event
request(
    string Title,
    string Location,
    string? Phone,
    string? Instagram,
    string? Description,
    DateTime? EventDate,
    string? EventLocation
)

#### /get/user/events
response(
    int Id,
    string Title,
    string Location,
    string Phone,
    string Instagram,
    float  Classification,
    string Description,
    string[] Images,
    DateTime EventDate,
    string EventLocation,
    DateTime CreatedAt,
    DateTime UpdatedAt
)

#### /update/user/event
request(
    int Id,
    string? Title,
    string? Location,
    string? Phone,
    string? Instagram,
    string? Description,
    DateTime? EventDate,
    string? EventLocation
)

#### /delete/user/event/{id}

---

### **IMAGE**

#### /upload/user/image
request(
    IFormFile File, 
    int Id
)

#### /delete/user/image
request(
    int Id,
    string Path
)
