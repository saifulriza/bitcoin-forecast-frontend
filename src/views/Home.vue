<template>
  <div
    :class="[
      $style['container-fluid'],
      $style['p-4'],
      $style['bg-default'],
      $style['text-white'],
    ]"
  >
    <div :class="[$style['row'], $style['m-4']]">
      <div :class="[$style['h4'], $style['font-weight-bold']]">
        Prediksi Harga
        <fa icon="btc" type="fab" width="25" height="25"></fa>itcoin
      </div>
    </div>
    <div
      :class="[
        $style['row'],
        $style['d-flex'],

        $style['justify-content-between'],
      ]"
    >
      <div
        :class="[
          $style['col-sm-12'],
          $style['mb-4'],
          $style['justify-center'],
          $style['col-xl-4'],
          $style['col-md-6'],
        ]"
      >
        <div :class="[$style['card'], $style['text-dark']]">
          <hr style="border:0.5px solid white;margin:4px; opacity:0.4" />
          <div :class="[$style['row'], $style['m-2']]">
            <!-- <fa icon="chart-pie" type="fas" width="25" height="25"></fa> -->
            <div :class="[$style['font-weight-bold']]">
              Hari ke {{ jumlahHariPrediksi }} dari hari ini
            </div>
            <input
              :class="[$style['form-control'], $style['m-2']]"
              type="number"
              v-model="jumlahHariPrediksi"
            />

            <button
              :class="[$style['btn'], $style['btn-primary']]"
              @click="fetchRamalKedepan"
            >
              Prediksi
            </button>
          </div>
        </div>
      </div>
      <div
        :class="[$style['col-xl-8'], $style['col-md-8'], $style['col-sm-12']]"
      >
        <Suspense>
          <template #default>
            <div
              :class="[
                $style['card'],
                $style['bg-white'],
                $style['m-0'],
                $style['pl-2'],
              ]"
            >
              <div id="chart" v-if="loadChart">
                <apexchart
                  type="line"
                  height="350"
                  :options="options"
                  :series="series"
                ></apexchart>
                <!-- <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="check"
                    v-model="yaxis"
                  />
                  <label
                    class="form-check-label"
                    for="check"
                    style="color:black"
                    >Lihat harga</label
                  >
                </div> -->
              </div>
              <div v-else>
                <img src="@/assets/chart.svg" />
              </div>
            </div>
          </template>
          <template #fallback>
            <div>Loading...</div>
          </template>
        </Suspense>
      </div>
    </div>
  </div>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <path
      fill="#000b76"
      fill-opacity="1"
      d="M0,288L48,245.3C96,203,192,117,288,112C384,107,480,181,576,202.7C672,224,768,192,864,202.7C960,213,1056,267,1152,288C1248,309,1344,299,1392,293.3L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
    ></path>
  </svg>
  <div :class="[$style['footer'], $style['text-center']]">
    Created with ❤ by Saiful riza
  </div>
</template>

<script>
// @ is an alias to /src
import { ref, onMounted, watchEffect, watch } from "vue";
import axios from "axios";
// require("dotenv").config();
export default {
  setup() {
    let data = ref([]);
    let dataAktual = ref([]);
    let dataPrediksi = ref([]);
    let tanggal = ref([]);
    let loadChart = ref(false);
    let series = ref([]);
    let options = ref({});
    let prediksiKedepan = ref("");
    let jumlahHariPrediksi = ref(1);
    // let yaxis = ref(true);
    onMounted(() => {
      fetchRamal();
    });

    const fetchRamalKedepan = async () => {
      loadChart.value = false;
      const hari = parseInt(jumlahHariPrediksi.value);
      await axios(`${process.env.VUE_APP_API_URL}api/v1/forecast/${hari}`).then(
        (res) => {
          prediksiKedepan.value = res.data;
          const tanggalPrediksi = new Date(
            prediksiKedepan.value.tanggal
          ).toLocaleDateString(["ban", "id"]);
          dataPrediksi.value.push(prediksiKedepan.value.forecast);
          tanggal.value.push(tanggalPrediksi);

          // dataAktual.value.push("");
          loadChart.value = true;
        }
      );
    };

    // watch(yaxis, () => {
    //   console.log(yaxis.value);
    //   loadChart.value = false;
    //   setTimeout(() => {
    //     loadChart.value = true;
    //   }, 2000);
    // });
    const fetchRamal = async () => {
      await axios(`${process.env.VUE_APP_API_URL}api/v1/forecast`).then(
        (res) => {
          data.value = res.data;

          res.data.forEach((el) => {
            dataAktual.value.push(el.asli);
            const parseTgl = new Date(el.tgl).toLocaleString("id-ID", {
              timeZone: "Asia/Jakarta",
            });
            // const tanggalPrediksi =
            //   parseTgl.getDate() +
            //   "-" +
            //   parseTgl.getMonth() +
            //   "-" +
            //   parseTgl.getFullYear();
            // console.log("aktual", el.asli);
            dataPrediksi.value.push(el.forecast);
            tanggal.value.push(parseTgl);
          });
          fetchRamalKedepan();
        }
      );
    };
    // console.log("data aktual", dataPrediksi);

    // watch(loadChart, (selection, prevSelection) => {
    //   console.log("load charta");
    //   console.table(series);
    // });

    series.value = [
      {
        name: "Data Aktual",
        type: "column",
        data: dataAktual.value,
      },
      {
        name: "Data Prediksi",
        type: "column",
        data: dataPrediksi.value,
      },
      {
        name: "Data Prediksi Line",
        type: "line",
        data: dataPrediksi.value,
      },
    ];
    options.value = {
      chart: {
        height: 350,
        type: "line",
        stacked: false,
        foreColor: "#9A9A9A",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [2, 2, 8],
      },
      title: {
        text: "Prediksi bitcoin bulan ini",
        align: "left",
        offsetX: 110,
      },
      xaxis: {
        categories: tanggal.value,
        tickPlacement: "on",
      },
      yaxis: [
        {
          show: false,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: "#008FFB",
          },
          labels: {
            style: {
              colors: "#008FFB",
            },
          },

          tooltip: {
            enabled: true,
          },
        },
      ],
      tooltip: {
        // fillSeriesColor: false,
        fixed: {
          enabled: true,
          position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60,
        },
      },
      legend: {
        horizontalAlign: "left",
        offsetX: 40,
      },
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true | '<img src="/static/icons/reset.png" width="20">',
          customIcons: [],
        },
        export: {
          csv: {
            filename: undefined,
            columnDelimiter: ",",
            headerCategory: "category",
            headerValue: "value",
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            },
          },
        },
        autoSelected: "zoom",
      },
    };
    // console.log(series.value);
    return {
      options,
      series,
      data,
      loadChart,
      jumlahHariPrediksi,
      fetchRamalKedepan,
      // yaxis,
    };
  },
};
</script>

<style lang="scss" module>
$success: #40b27e;
$white: #eaf7f1;
@import "bootstrap/scss/bootstrap.scss";

.bg-default {
  background-color: #000b76;
}

.text-hover:hover {
  color: black;
}
</style>
