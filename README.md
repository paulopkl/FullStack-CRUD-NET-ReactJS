## Comandos para rodar API
Drivers/all-command-project.txt

Entre na pasta da API Drivers/ e rode os comandos abaixo para subir o banco de dados:

```docker compose up -d```

Entre na pasta da API Drivers/Backend/ e rode os comandos abaixo:

```dotnet restore```

```dotnet ef database update```

```dotnet build```

```dotnet run```

## Comandos para rodar frontend

Entre na pasta frontend/ e rode os comandos abaixo:

```npm install```
```npm run dev```
