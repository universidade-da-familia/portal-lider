import React from 'react';

export default [
  {
    category: 'Pedidos',
    questions: [
      {
        description: 'Quem pode adquirir materiais pelo Portal do Líder?',
        answer: (
          <p>
            Somente o líder (pessoa física), devidamente habilitado pela
            Universidade da Família.
          </p>
        ),
      },
      {
        description: 'Quais materiais posso adquirir pelo Portal do Líder?',
        answer: (
          <p>
            O líder pode comprar quantidade indeterminada de materiais didáticos
            de todos os cursos para os quais está habilitado. Já o participante
            só pode comprar, para si próprio, o material didático correspondente
            ao curso no qual está inscrito.
          </p>
        ),
      },
      {
        description:
          'Posso comprar pelo Portal do Líder com nota fiscal emitida para a igreja?',
        answer: (
          <p>
            Não. Até o momento, os pedidos no Portal do Líder são feitos
            pessoalmente pelo líder ou participante cadastrado. Pedidos em nome
            da igreja ou outra pessoa jurídica deverão ser feitos pelo telefone
            (14) 3405 8500, pelo WhatsApp (14) 9 8163 0195 ou pelo e-mail
            pedidos@udf.org.br.
          </p>
        ),
      },
      {
        description: 'É possível fazer alteração em pedido já finalizado?',
        answer: (
          <p>
            Como o pedido já finalizado é imediatamente encaminhado para
            faturamento, com emissão da nota fiscal e processamento do pagamento
            (geração do boleto ou aprovação do cartão de crédito), não é
            possível fazer nenhuma alteração.
          </p>
        ),
      },
      {
        description: 'Finalizei o meu pedido e quero cancelar. É possível?',
        answer: (
          <p>
            O pedido finalizado é imediatamente encaminhado para faturamento,
            com emissão da nota fiscal e processamento do pagamento. Assim, não
            é possível cancelar após finalizado.
          </p>
        ),
      },
      {
        description:
          'Recebi meu pedido, mas o produto veio errado, em quantidade diferente da solicitada ou com defeito. O que fazer?',
        answer: (
          <p>
            Entre em contato com nosso atendimento pelo telefone (14) 3405 8500
            ou pelo WhatsApp (14) 9 8163 0195.
          </p>
        ),
      },
    ],
  },
  {
    category: 'Condições de pagamento',
    questions: [
      {
        description: 'Quais são as condições e formas de pagamento?',
        answer: (
          <p>
            Há duas formas de pagamento possíveis: boleto bancário e cartão de
            crédito. Para compras de qualquer valor com pagamento mediante
            boleto bancário, o pagamento é à vista (o boleto tem vencimento para
            3 dias úteis e o pedido só é liberado após a identificação do
            pagamento do boleto). No cartão de crédito, pedidos de até R$ 250,00
            podem ser parcelados em duas vezes; a partir de R$ 250,00, é
            possível parcelar em até três vezes.
          </p>
        ),
      },
      {
        description:
          'Não recebi o boleto bancário para pagamento. O que fazer?',
        answer: (
          <p>
            O boleto bancário é gerado no momento da finalização do pedido. Ele
            é enviado por e-mail e também fica disponível para download, a
            qualquer momento, no seu histórico de pedidos registrado no Portal.
            <br />
            Como o boleto é enviado pela plataforma de pagamentos PayU, procure,
            na sua caixa de e-mails, mensagem deste remetente.
          </p>
        ),
      },
      {
        description: 'O que é a PayU?',
        answer: (
          <p>
            A PayU é a plataforma de pagamentos online utilizada pela
            Universidade da Família. É ela quem gera os boletos bancários, faz a
            gestão do ambiente seguro para operações de cartão de crédito
            referentes a todas as compras feitas pela Universidade da Família e
            envia para o seu e- mail os links para pagamento das transações
            realizadas no Portal do Líder.
          </p>
        ),
      },
    ],
  },
  {
    category: 'Frete e envio',
    questions: [
      {
        description: 'Quais são as condições de frete?',
        answer: (
          <p>
            A partir de 01/01/2021, a Universidade da Família deixou de oferecer
            frete grátis para materiais didáticos. Ao fazer seu pedido, você
            deverá selecionar a opção de frete mais conveniente. O valor será
            acrescentado ao preço final do pedido.
          </p>
        ),
      },
      {
        description:
          'Posso reunir os materiais do meu grupo num só pedido para otimizar o frete?',
        answer: (
          <p>
            Sim. Nesse caso, o pedido deverá ser feito pelo líder, pois só ele
            está autorizado a comprar o material na quantidade suficiente para
            todos os participantes do grupo - o participante só pode comprar
            diretamente para si próprio.
          </p>
        ),
      },
      {
        description:
          'O que fazer em caso de problemas referentes ao recebimento do meu pedido?',
        answer: (
          <p>
            Entre em contato conosco pelo telefone (14) 3405 8500 ou pelo
            WhatsApp (14) 9 8224 0268.
          </p>
        ),
      },
      {
        description: 'Quanto tempo demora para chegar o meu pedido?',
        answer: (
          <p>
            Os prazos de entrega variam conforme a opção de envio selecionada,
            são informados no momento da compra e passam a contar a partir do
            momento da expedição.
            <br />
            Pode haver dificuldades de entrega em certas regiões devido à
            insegurança urbana ou a desastres naturais. Caso você resida em
            localidade nessas condições, deve considerar isso ao fazer o seu
            pedido e tomar medidas que previnam atrasos ou frustração da entrega
            devido a tais fatores.
          </p>
        ),
      },
    ],
  },
  {
    category: 'Certificado',
    questions: [
      {
        description:
          'Como funciona o envio dos certificados de conclusão de curso?',
        answer: (
          <p>
            Desde 01/01/2021, a Universidade da Família emite certificados de
            conclusão de curso somente em formato digital. Após o líder
            cadastrar o grupo no Portal e respeitada a exigência mínima de
            frequência de cada curso, os certificados estarão disponíveis para
            download pelo líder.
          </p>
        ),
      },
      // {
      //   description: 'Qual o prazo para recebimento dos certificados?',
      //   answer: (
      //     <p>O prazo é de 15 a 20 dias, contados da data de envio pela UDF.</p>
      //   ),
      // },
      // {
      //   description:
      //     'Existe opção mais rápida para recebimento dos certificados?',
      //   answer: (
      //     <p>
      //       Caso os certificados de seu grupo ainda não tenham sido enviados,
      //       você pode solicitar à secretaria do ministério de seu curso que
      //       envie o certificado mediante uma opção de frete com prazo mais
      //       curto. Nesse caso, o frete será cobrado.
      //     </p>
      //   ),
      // },
      {
        description:
          'Meu grupo já chegou à última lição do curso, mas não recebi os certificados. O que devo fazer?',
        answer: (
          <p>
            Entre em contato com a secretaria do ministério de seu curso pelo
            telefone (14) 3405 8500 ou pelos números abaixo (WhatsApp):
            <br />
            <br />
            <ul>
              <li>Hombridade: (14) 9 8195 0053</li>
              <li>Mulher Única: (14) 9 8195 0052</li>
              <li>Crown Finanças: (14) 9 8219 0045</li>{' '}
              <li>A Mulher Que Prospera: (14) 9 8195 0051</li>
              <li>Aliança e Romance: (14) 9 8219 0071</li>
              <li>Habitudes e Yes!: (14) 9 8206 3773</li>
              <li>Paternidade Bíblica: (14) 9 8163 0301</li>
            </ul>
            {/* <br />
            Caso o não recebimento dos certificados tenha ocorrido por falta de
            cadastro do grupo ou por irregularidades nos relatórios semanais, o
            líder receberá os arquivos em PDF para impressão e distribuição
            direta ao grupo. */}
          </p>
        ),
      },
      // {
      //   description: 'Posso receber segunda via dos certificados do meu grupo?',
      //   answer: (
      //     <p>
      //       A UDF somente envia segunda via de certificados de grupo mediante
      //       arquivo em PDF. Você deve fazer sua solicitação junto à secretaria
      //       do ministério de seu curso.
      //     </p>
      //   ),
      // },
    ],
  },
  {
    category: 'Cadastro',
    questions: [
      {
        description:
          'Até quando o líder deve cadastrar os participantes do meu grupo?',
        answer: (
          <p>
            O líder deve cadastrar os participantes de seu grupo (com nome e
            e-mail) imediatamente à confirmação da participação deles no curso.
            Feito isso, cada participante receberá um convite por e-mail para
            acessar o Portal do Líder e fazer seu cadastro. Na sequência, o
            participante também estará habilitado a fazer o pedido de seu
            material didático.
            <br />O cadastro do grupo no Portal do Líder é indispensável para a
            ativação do grupo junto à Universidade da Família e outros processos
            decorrentes disso, como a emissão dos certificados.
          </p>
        ),
      },
      {
        description:
          'O e-mail é campo obrigatório no cadastro do participante, mas uma pessoa do meu grupo não tem. O que fazer?',
        answer: (
          <p>
            O e-mail é o canal para a Universidade da Família solicitar o
            consentimento do participante para cadastrar seus dados pessoais.
            Trata-se de uma exigência legal. Se alguém de seu grupo não possui
            e-mail, pedimos que oriente essa pessoa a criar uma conta pessoal
            para essa finalidade.
          </p>
        ),
      },
      {
        description:
          'O CPF é campo obrigatório no cadastro do participante, mas meu grupo tem um estrangeiro que não possui esse documento. Como fazer?',
        answer: (
          <p>
            Cadastro de estrangeiros que não possuem CPF deverão ser feitos
            junto à secretaria do ministério de seu curso. Entre em contato
            pelos números abaixo (WhatsApp):
            <br />
            <br />
            <ul>
              <li>Hombridade: (14) 9 8195 0053</li>
              <li>Mulher Única: (14) 9 8195 0052</li>
              <li>Crown Finanças: (14) 9 8219 0045</li>{' '}
              <li>A Mulher Que Prospera: (14) 9 8195 0051</li>
              <li>Aliança e Romance: (14) 9 8219 0071</li>
              <li>Habitudes e Yes!: (14) 9 8206 3773</li>
              <li>Paternidade Bíblica: (14) 9 8163 0301</li>
            </ul>
          </p>
        ),
      },
      // {
      //   description:
      //     'Até quando posso cadastrar os participantes do meu grupo?',
      //   answer: (
      //     <p>
      //       Você deve cadastrar os participantes do seu grupo até a primeira
      //       lição semanal. Essa ação é importante para a ativação do grupo junto
      //       à Universidade da Família e outros processos decorrentes disso, como
      //       a emissão e envio dos certificados.
      //     </p>
      //   ),
      // },
      // {
      //   description:
      //     'O e-mail é campo obrigatório no cadastro do participante, mas uma pessoa do meu grupo não tem. O que fazer?',
      //   answer: (
      //     <p>
      //       O e-mail é o canal para a Universidade da Família solicitar o
      //       consentimento do participante para cadastrar seus dados pessoais.
      //       Trata-se de uma exigência legal. Se alguém de seu grupo não possui
      //       e-mail, pedimos que oriente essa pessoa a criar uma conta pessoal
      //       para essa finalidade.
      //     </p>
      //   ),
      // },
      // {
      //   description:
      //     'O CPF é campo obrigatório no cadastro do participante, mas meu grupo tem um estrangeiro que não possui esse documento. Como fazer?',
      //   answer: (
      //     <p>
      //       Cadastro de estrangeiros que não possuem CPF deverão ser feitos
      //       junto às secretarias do ministério de seu curso.Entre em contato
      //       pelos números abaixo (WhatsApp):
      //       <br />
      //       <br />
      //       <ul>
      //         <li>Hombridade: (14) 9 8195 0053</li>
      //         <li>Mulher Única: (14) 9 8195 0052</li>
      //         <li>Crown Finanças: (14) 9 8219 0045</li>
      //         <li>A Mulher Que Prospera: (14) 9 8163 0233</li>
      //         <li>Aliança e Romance: (14) 9 8219 0071</li>
      //         <li>Habitudes e Yes!: (14) 9 8206 3773</li>
      //         <li>Paternidade Bíblica: (14) 9 8163 0301</li>
      //       </ul>
      //     </p>
      //   ),
      // },
    ],
  },
];
