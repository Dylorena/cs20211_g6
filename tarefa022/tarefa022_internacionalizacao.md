# Tarefa 022 - Internacionalização - 15/10/2021

1. Fazer uma pesquisa sobre como implementar o conceito de **Internacionalização** em API Rest. Destacar se estão implementando este conceito no projeto do grupo. Se sim, como está sendo. Se não, qual o custo (tempo) e quais impedimentos para a implementação.

    R.: No javascript a internacionalização pode ser implementada pelo objeto nativo "intl", ele fornece comparação sensível de string, formatação de datas e números. Fora essa opção nativa também é possível adicionar internalização por meio de inúmeras bibliotecas existentes como por exemplo a "i18next.js". Quando se adiciona um componente/ biblioteca de datas e monetário é comum que elas já tenham uma configuração de internacionalização. Existe uma forma mais manual também onde se cria dois ou mais arquivos que são objetos, a chave do objeto é a mesma em todos os arquivos e o valor muda conforme a linguagem escolhida, uma função sempre recebe a chave e conforme uma configuração de qual linguagem se quer o sistema chama o valor conforme a linguagem escolhida.
O custo médio de tempo para adicionar internacionalização em nosso projeto seria 12 horas. Atualmente é inviável adiconar internalização pois o projeto encontra-se com o status de atrasado nas entregas.

**INSTRUÇÕES**
1. Criar a pasta "tarefa022", na _branch develop_, do seu repositório do projeto do grupo.
2. _Commitar_ nesta _branch_ este arquivo "tarefa022_internacionalizacao.md", atualizado com o relatório do grupo, disposto imediatamente após o item 1.
2. O prazo para entrega desta tarefa é as 23h59min do dia 15/10/2021.
