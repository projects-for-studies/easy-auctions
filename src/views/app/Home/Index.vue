<template>
  <div class="d-block w-100 h-100">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333; width: 100%; height: 480px"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
      img-width="1024"
      img-height="480"
      >
        <b-carousel-slide
            caption="First slide"
            style="text-shadow: 1px 1px 2px #333; width: 100%; height: 480px"
            img-src="https://picsum.photos/1024/480/?image=10"
        >
        </b-carousel-slide>
        <b-carousel-slide
            caption="Second Slide"
            style="text-shadow: 1px 1px 2px #333; width: 100%; height: 480px"
            img-src="https://picsum.photos/1024/480/?image=12"
        ></b-carousel-slide>
        <b-carousel-slide
            caption="Third Slide"
            style="text-shadow: 1px 1px 2px #333; width: 100%; height: 480px"
            img-src="https://picsum.photos/1024/480/?image=22"
        ></b-carousel-slide>
      </b-carousel>
      <b-row>
        <b-col sm="12">
          <div class="d-flex w-100 align-items-center justify-content-start">
            <span class="h4 text-dark font-weight-bold text-uppercase text-title-1">Leilões em tempo real</span>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="3" v-for="(auction, index) in auctions" :key="`auction_${index}`">
          <b-card no-body border-variant="success" style="margin-bottom: 20px">
            <div>
              <b-carousel
                  id="carousel-fade"
                  style="text-shadow: 0px 0px 2px #000; width: 100%; height: 250px"
                  :interval="4000"
                  controls

              >
                <b-carousel-slide
                    img-src="http://localhost:3000/images_auctions/pc_gamer_1.jpeg"
                ></b-carousel-slide>
                <b-carousel-slide
                    img-src="http://localhost:3000/images_auctions/pc_gamer_2.jpeg"
                ></b-carousel-slide>
                <b-carousel-slide
                    img-src="http://localhost:3000/images_auctions/pc_gamer_3.jpeg"
                ></b-carousel-slide>
              </b-carousel>
            </div>
            <b-card-text class="text-left" style="padding: 0.5em">
              <smal class="d-flex justify-content-between align-items-center">
                <b-link to="#" class="text-dark">{{ auction.title }}</b-link>
                <b-avatar variant="info" src="https://placekitten.com/300/300" size="2em" style="cursor: pointer" v-b-tooltip.hover :title="auction.organizer"></b-avatar>
              </smal>
              <smal class="d-flex justify-content-start align-items-center" style="margin-top: 10px">
                  <b-avatar variant="transparent" icon="calendar-fill" size="1.5em" style="margin-right: 5px; margin-left: -3px"></b-avatar>
                  <span style="font-size: 0.8em" class="text-muted">{{ auction.start_auction + ' - ' + auction.end_auction }} </span>
                  <b-avatar variant="transparent" icon="hourglass-split" size="1.5em" style="margin-left:5px"></b-avatar>
                  <span style="font-size: 0.8em" class="text-muted">{{auction.duration }} </span>
              </smal>
              <smal class="d-flex justify-content-start align-items-center" style="margin-top: 10px">
                <span class="text-muted" style="font-size: 0.8em">
                  {{ auction.description }}
                </span>
              </smal>
              <smal class="d-flex justify-content-between align-items-center" style="margin-top: 10px">
                <b-badge variant="success">{{ auction.status }} </b-badge>
                <span class="text-success" style="font-size: 0.9em">
                  {{ auction.minimum_bid }}
                </span>
              </smal>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12">
          <div class="d-flex w-100 align-items-center justify-content-start">
            <span class="h4 text-dark font-weight-bold text-uppercase text-title-2">Leilões a iniciar</span>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="3" v-for="(auction, index) in scheduled_auctions" :key="`auction_${index}`">
          <b-card no-body border-variant="info" style="margin-bottom: 20px">
            <div>
              <b-carousel
                  id="carousel-fade"
                  style="text-shadow: 0px 0px 2px #000; width: 100%; height: 250px"
                  :interval="4000"
                  controls
              >
                <b-carousel-slide
                    img-src="http://localhost:3000/images_auctions/pc_gamer_1.jpeg"
                ></b-carousel-slide>
                <b-carousel-slide
                    img-src="http://localhost:3000/images_auctions/pc_gamer_2.jpeg"
                ></b-carousel-slide>
                <b-carousel-slide
                    img-src="http://localhost:3000/images_auctions/pc_gamer_3.jpeg"
                ></b-carousel-slide>
              </b-carousel>
            </div>
            <b-card-text class="text-left" style="padding: 0.5em">
              <smal class="d-flex justify-content-between align-items-center">
                <b-link to="#" class="text-dark">{{ auction.title }}</b-link>
                <b-avatar variant="info" src="https://placekitten.com/300/300" size="2em" style="cursor: pointer" v-b-tooltip.hover :title="auction.organizer"></b-avatar>
              </smal>
              <smal class="d-flex justify-content-start align-items-center" style="margin-top: 10px">
                <b-avatar variant="transparent" icon="calendar-fill" size="1.5em" style="margin-right: 5px; margin-left: -3px"></b-avatar>
                <span style="font-size: 0.8em" class="text-muted">{{ auction.start_auction + ' - ' + auction.end_auction }} </span>
                <b-avatar variant="transparent" icon="hourglass-split" size="1.5em" style="margin-left:5px"></b-avatar>
                <span style="font-size: 0.8em" class="text-muted">{{auction.duration }} </span>
              </smal>
              <smal class="d-flex justify-content-start align-items-center" style="margin-top: 10px">
                <span class="text-muted" style="font-size: 0.8em">
                  {{ auction.description }}
                </span>
              </smal>
              <smal class="d-flex justify-content-between align-items-center" style="margin-top: 10px">
                <b-badge variant="info">{{ auction.status }} </b-badge>
                <span class="text-success" style="font-size: 0.9em">
                  {{ auction.minimum_bid }}
                </span>
              </smal>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12">
          <div class="d-flex w-100 align-items-center justify-content-start">
            <span class="h4 text-dark font-weight-bold text-uppercase text-title-3">Leilões finalizados</span>
          </div>
        </b-col>
      </b-row>
      <b-row>
      <b-col sm="3" v-for="(auction, index) in finished_auctions" :key="`auction_${index}`">
        <b-card no-body border-variant="danger" style="margin-bottom: 20px">
          <div>
            <b-carousel
                id="carousel-fade"
                style="text-shadow: 0px 0px 2px #000; width: 100%; height: 250px"
                :interval="4000"
                controls

            >
              <b-carousel-slide
                  img-src="http://localhost:3000/images_auctions/pc_gamer_1.jpeg"
              ></b-carousel-slide>
              <b-carousel-slide
                  img-src="http://localhost:3000/images_auctions/pc_gamer_2.jpeg"
              ></b-carousel-slide>
              <b-carousel-slide
                  img-src="http://localhost:3000/images_auctions/pc_gamer_3.jpeg"
              ></b-carousel-slide>
            </b-carousel>
          </div>
          <b-card-text class="text-left" style="padding: 0.5em">
            <smal class="d-flex justify-content-between align-items-center">
              <b-link to="#" class="text-dark">{{ auction.title }}</b-link>
              <b-avatar variant="info" src="https://placekitten.com/300/300" size="2em" style="cursor: pointer" v-b-tooltip.hover :title="auction.organizer"></b-avatar>
            </smal>
            <smal class="d-flex justify-content-start align-items-center" style="margin-top: 10px">
              <b-avatar variant="transparent" icon="calendar-fill" size="1.5em" style="margin-right: 5px; margin-left: -3px"></b-avatar>
              <span style="font-size: 0.8em" class="text-muted">{{ auction.start_auction + ' - ' + auction.end_auction }} </span>
              <b-avatar variant="transparent" icon="hourglass-split" size="1.5em" style="margin-left:5px"></b-avatar>
              <span style="font-size: 0.8em" class="text-muted">{{auction.duration }} </span>
            </smal>
            <smal class="d-flex justify-content-start align-items-center" style="margin-top: 10px">
                <span class="text-muted" style="font-size: 0.8em">
                  {{ auction.description }}
                </span>
            </smal>
            <smal class="d-flex justify-content-between align-items-center" style="margin-top: 10px">
              <b-badge variant="danger">{{ auction.status }} </b-badge>
              <span class="text-success" style="font-size: 0.9em">
                  {{ auction.minimum_bid }}
                </span>
            </smal>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  export default {
    name: "Index",
    data:() => ({
      slide: 0,
      sliding: null,
      auctions:[
        {
          status: "EM ANDAMENTO",
          link: "",
          organizer: "Rafael Leonan",
          title: "Computador gamer completo",
          description: "Computador gamer completo, com teclado, monitor, mouse, headsets e mousepad, sem frete.",
          start_auction: "06 Out., 20:00",
          end_auction: "06 Out., 22:00 ",
          duration: "2Hrs",
          minimum_bid: "R$ 3500,00",
          photos:[]
        },
        {
          status: "EM ANDAMENTO",
          link: "",
          organizer: "Rafael Leonan",
          title: "Computador gamer completo",
          description: "Computador gamer completo, com teclado, monitor, mouse, headsets e mousepad, sem frete.",
          start_auction: "06 Out., 20:00",
          end_auction: "06 Out., 22:00 ",
          duration: "2Hrs",
          minimum_bid: "R$ 3500,00",
          photos:[]
        },
        {
          status: "EM ANDAMENTO",
          link: "",
          organizer: "Rafael Leonan",
          title: "Computador gamer completo",
          description: "Computador gamer completo, com teclado, monitor, mouse, headsets e mousepad, sem frete.",
          start_auction: "06 Out., 20:00",
          end_auction: "06 Out., 22:00 ",
          duration: "2Hrs",
          minimum_bid: "R$ 3500,00",
          photos:[]
        },
        {
          status: "EM ANDAMENTO",
          link: "",
          organizer: "Rafael Leonan",
          title: "Computador gamer completo",
          description: "Computador gamer completo, com teclado, monitor, mouse, headsets e mousepad, sem frete.",
          start_auction: "06 Out., 20:00",
          end_auction: "06 Out., 22:00 ",
          duration: "2Hrs",
          minimum_bid: "R$ 3500,00",
          photos:[]
        },
        {
          status: "EM ANDAMENTO",
          link: "",
          organizer: "Rafael Leonan",
          title: "Computador gamer completo",
          description: "Computador gamer completo, com teclado, monitor, mouse, headsets e mousepad, sem frete.",
          start_auction: "06 Out., 20:00",
          end_auction: "06 Out., 22:00 ",
          duration: "2Hrs",
          minimum_bid: "R$ 3500,00",
          photos:[]
        },
        {
          status: "EM ANDAMENTO",
          link: "",
          organizer: "Rafael Leonan",
          title: "Computador gamer completo",
          description: "Computador gamer completo, com teclado, monitor, mouse, headsets e mousepad, sem frete.",
          start_auction: "06 Out., 20:00",
          end_auction: "06 Out., 22:00 ",
          duration: "2Hrs",
          minimum_bid: "R$ 3500,00",
          photos:[]
        },
        {
          status: "EM ANDAMENTO",
          link: "",
          organizer: "Rafael Leonan",
          title: "Computador gamer completo",
          description: "Computador gamer completo, com teclado, monitor, mouse, headsets e mousepad, sem frete.",
          start_auction: "06 Out., 20:00",
          end_auction: "06 Out., 22:00 ",
          duration: "2Hrs",
          minimum_bid: "R$ 3500,00",
          photos:[]
        },
      ],
      scheduled_auctions:[
        {
          status: "A INICIAR",
          link: "",
          organizer: "Rafael Leonan",
          title: "Computador gamer completo",
          description: "Computador gamer completo, com teclado, monitor, mouse, headsets e mousepad, sem frete.",
          start_auction: "06 Out., 20:00",
          end_auction: "06 Out., 22:00 ",
          duration: "2Hrs",
          minimum_bid: "R$ 3500,00",
          photos:[]
        },
        {
          status: "A INICIAR",
          link: "",
          organizer: "Rafael Leonan",
          title: "Computador gamer completo",
          description: "Computador gamer completo, com teclado, monitor, mouse, headsets e mousepad, sem frete.",
          start_auction: "06 Out., 20:00",
          end_auction: "06 Out., 22:00 ",
          duration: "2Hrs",
          minimum_bid: "R$ 3500,00",
          photos:[]
        },
        {
          status: "A INICIAR",
          link: "",
          organizer: "Rafael Leonan",
          title: "Computador gamer completo",
          description: "Computador gamer completo, com teclado, monitor, mouse, headsets e mousepad, sem frete.",
          start_auction: "06 Out., 20:00",
          end_auction: "06 Out., 22:00 ",
          duration: "2Hrs",
          minimum_bid: "R$ 3500,00",
          photos:[]
        },
        {
          status: "A INICIAR",
          link: "",
          organizer: "Rafael Leonan",
          title: "Computador gamer completo",
          description: "Computador gamer completo, com teclado, monitor, mouse, headsets e mousepad, sem frete.",
          start_auction: "06 Out., 20:00",
          end_auction: "06 Out., 22:00 ",
          duration: "2Hrs",
          minimum_bid: "R$ 3500,00",
          photos:[]
        },
      ],
      finished_auctions:[
        {
          status: "FINALIDADO",
          link: "",
          organizer: "Rafael Leonan",
          title: "Computador gamer completo",
          description: "Computador gamer completo, com teclado, monitor, mouse, headsets e mousepad, sem frete.",
          start_auction: "06 Out., 20:00",
          end_auction: "06 Out., 22:00 ",
          duration: "2Hrs",
          minimum_bid: "R$ 3500,00",
          photos:[]
        },
        {
          status: "FINALIDADO",
          link: "",
          organizer: "Rafael Leonan",
          title: "Computador gamer completo",
          description: "Computador gamer completo, com teclado, monitor, mouse, headsets e mousepad, sem frete.",
          start_auction: "06 Out., 20:00",
          end_auction: "06 Out., 22:00 ",
          duration: "2Hrs",
          minimum_bid: "R$ 3500,00",
          photos:[]
        },
        {
          status: "FINALIDADO",
          link: "",
          organizer: "Rafael Leonan",
          title: "Computador gamer completo",
          description: "Computador gamer completo, com teclado, monitor, mouse, headsets e mousepad, sem frete.",
          start_auction: "06 Out., 20:00",
          end_auction: "06 Out., 22:00 ",
          duration: "2Hrs",
          minimum_bid: "R$ 3500,00",
          photos:[]
        },
        {
          status: "FINALIDADO",
          link: "",
          organizer: "Rafael Leonan",
          title: "Computador gamer completo",
          description: "Computador gamer completo, com teclado, monitor, mouse, headsets e mousepad, sem frete.",
          start_auction: "06 Out., 20:00",
          end_auction: "06 Out., 22:00 ",
          duration: "2Hrs",
          minimum_bid: "R$ 3500,00",
          photos:[]
        },
      ],
    }),
    methods: {
      onSlideStart() {
        this.sliding = true
      },
      onSlideEnd() {
        this.sliding = false
      }
    }
  }
</script>

<style scoped>
  div.d-block.w-100.w-100 .row {
    padding: 0px 15px;
    margin: 40px 0px;
  }
  .text-title-1{
    width: 100%;
    cursor: default;
    text-align: left;
    padding: 5px 0px;
    border-radius: 0.25rem;
    background-color: transparent;
    border-bottom: 1px solid #28a745;
  }
  .text-title-2{
    width: 100%;
    cursor: default;
    text-align: left;
    padding: 5px 0px;
    border-radius: 0.25rem;
    background-color: transparent;
    border-bottom: 1px solid #17a2b8;
  }
  .text-title-3{
    width: 100%;
    cursor: default;
    text-align: left;
    padding: 5px 0px;
    border-radius: 0.25rem;
    background-color: transparent;
    border-bottom: 1px solid #dc3545;
  }
</style>