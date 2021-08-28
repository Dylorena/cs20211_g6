
## Definições

**Membros do grupo:** Célia Rodrigues; Diana Santos; Iolanda de Paula 

**Serviço em desenvolvimento:** Gerenciador de imóveis

**Requisitos mínimos:**
* O sistema não deve permitir que haja duplicação de CPF independente do perfil assumido pelo usuário.
* Apenas o  perfil intitulado Gerenciador poderá excluir imóveis ou alterar o status do imóvel para indisponível.
* O número máximo de aluguéis em vigência e um mesmo CPF é restrito a 06.
* Um imóvel não pode ser excluído caso o status seja "Em negociação".
* O sistema não deve permitir que um imóvel que esteja "Em negociação" vinculado a um CPF seja vinculado este mesmo imóvel a outro CPF.

**Mecanismo de persistência:** A definir.

**Deploy do serviço:** Netlify ou Amazon

**Linguagem:** javascript.
