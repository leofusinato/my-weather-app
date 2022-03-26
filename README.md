# 📱 my-weather-app

Aplicação desenvolvida com Expo, React Native e TypeScript para previsão do tempo de praticamente qualquer cidade no mundo (baseado nos dados do Google).

- Obs: Todo o desenvolvimento foi realizado e testado em dispositivos Android, devido a falta de recursos necessários para testes no iOS.

### 🙏 Setup inicial

- Instalar <a href="https://nodejs.org/en/">NodeJS</a> (recomendado sempre utilizar a versão LTS)
- Instalar <a href="https://yarnpkg.com/">Yarn</a>
- Instalar <a href="https://docs.expo.dev/get-started/installation/">Expo</a>
- Instalar <a href="https://developer.android.com/studio?hl=pt-br">Android Studio</a> e um emulador de sua preferência. Se preferir, pode ser usado um dispositívo físico a partir do app Expo disponível na <a href="https://play.google.com/store/apps/details?id=host.exp.exponent">Play Store</a> e <a href="https://apps.apple.com/br/app/expo-go/id982107779">App Store</a>

Após clonar o repositório, é necessário instalar as dependências do projeto. Para isto, basta executar o comando

```bash
yarn install 
#ou apenas yarn
```
### 🚀 Iniciando a aplicação

Para iniciar a aplicação com Expo, basta executar o comando

```bash
expo start
```
Para o funcionamento completo do app é necessário ter um arquivo chamado ".env", que pode ser criado a partir do arquivo ".env.example". Nele será necessário informar a chave da API do Google Places e também da API de previsão do tempo da <a href="https://openweathermap.org/api">Open Weather Map</a>.

### 🤓 Adicional
Para fins de comparação de eficiência e desempenho, a branch main utiliza a Context API para gerenciamento de estados da aplicação. Se a branch for alterada para "zustand", esta <a href="https://github.com/pmndrs/zustand">biblioteca</a> será utilizada ao invés da Context API.
