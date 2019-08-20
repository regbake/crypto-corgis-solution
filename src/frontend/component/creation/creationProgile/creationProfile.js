import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { TiDelete } from "react-icons/ti";

class CreationProfile extends Component {
    deleteCorgi = () => {
        let { contract, corgi, handleChange } = this.props
        contract.deleteCorgiProfile({
            tokenId: corgi.dna
        }).then(response => {
            console.log("[profile.js] left", response)
            let newCorgis = response
            handleChange({ name: "corgis", value: newCorgis })
        })
    }
    render() {
        let { corgi } = this.props
        if (!corgi) { return <Redirect to="/profile" /> }
        let uncommon = (<div>
            <svg width="96px" height="48px" viewBox="0 0 96 48" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="result" transform="translate(-121.000000, -1103.000000)" fill={corgi.color}>
                        <path d="M139.074948,1148.0508 C139.088948,1148.01813 139.103615,1147.98547 139.118282,1147.9528 L139.120282,1147.9488 C139.135615,1147.91547 139.150948,1147.8808 139.167615,1147.8468 C139.167615,1147.84613 139.167615,1147.84547 139.168282,1147.8448 C139.183615,1147.81013 139.200282,1147.7748 139.217615,1147.73813 C139.344948,1147.4648 139.494948,1147.1608 139.663615,1146.84547 C139.637615,1147.10213 139.588948,1147.35813 139.519615,1147.60813 C139.446948,1147.8708 139.352948,1148.1348 139.241615,1148.38013 C139.140948,1148.3708 139.038948,1148.3668 138.937615,1148.36547 C138.978282,1148.26947 139.024282,1148.1648 139.074948,1148.0508 M216.956948,1114.00013 C216.833615,1112.45547 216.507615,1110.92547 215.969615,1109.47347 C215.703615,1108.74613 215.390282,1108.0368 215.033615,1107.34947 C214.857615,1107.00547 214.666282,1106.66813 214.464948,1106.3368 C214.262282,1106.0048 214.054282,1105.6828 213.813615,1105.36547 C213.783615,1105.3248 213.735615,1105.29813 213.681615,1105.2968 C213.586948,1105.29413 213.506948,1105.36947 213.504948,1105.46413 L213.504948,1105.47147 C213.502948,1105.5288 213.496948,1105.6028 213.489615,1105.6708 C213.483615,1105.73947 213.472948,1105.81013 213.464282,1105.88013 C213.445615,1106.02013 213.420948,1106.1608 213.394948,1106.3008 C213.342282,1106.58147 213.280282,1106.86147 213.212948,1107.1408 C213.143615,1107.41947 213.072282,1107.69813 212.992282,1107.9748 C212.916948,1108.2528 212.829615,1108.52747 212.745615,1108.80347 C212.401615,1109.90413 212.004948,1110.99013 211.586282,1112.0668 L211.266948,1112.87347 L210.935615,1113.67547 C210.720282,1114.21147 210.485615,1114.74013 210.258282,1115.2728 C209.808948,1116.33147 209.242948,1117.3348 208.526948,1118.2348 C207.818282,1119.1388 206.996948,1119.95347 206.102282,1120.67747 C205.648282,1121.0328 205.187615,1121.37947 204.702282,1121.69147 C204.224282,1122.0128 203.726282,1122.30613 203.221615,1122.58613 C202.714948,1122.86347 202.196282,1123.1188 201.671615,1123.36013 C201.144282,1123.59613 200.609615,1123.8168 200.066948,1124.01947 C199.714948,1124.15147 199.358282,1124.27347 199.000282,1124.38947 C198.933615,1124.3288 198.866948,1124.27013 198.800282,1124.21147 C198.767615,1124.18213 198.734948,1124.15213 198.701615,1124.1228 C198.637615,1124.06747 198.572948,1124.01413 198.508282,1123.95947 C198.468948,1123.92613 198.428948,1123.89213 198.388948,1123.85947 C198.326948,1123.80813 198.263615,1123.7588 198.200948,1123.7088 C198.158282,1123.67547 198.115615,1123.64013 198.072282,1123.60613 C198.010282,1123.5588 197.948948,1123.51213 197.886948,1123.46547 C197.841615,1123.43147 197.796948,1123.39813 197.751615,1123.36413 C197.690282,1123.3188 197.628948,1123.27613 197.566948,1123.23147 C197.520282,1123.1988 197.474282,1123.16547 197.426948,1123.1328 C197.366282,1123.09013 197.304282,1123.0488 197.242282,1123.00813 C197.194948,1122.97547 197.146948,1122.9428 197.098948,1122.91147 C197.037615,1122.8708 196.976282,1122.83213 196.914282,1122.7928 C196.865615,1122.76213 196.816948,1122.7308 196.768282,1122.7008 C196.706282,1122.6628 196.644282,1122.62547 196.582948,1122.5888 C196.533615,1122.5588 196.483615,1122.5288 196.433615,1122.49947 C196.371615,1122.46347 196.310282,1122.42813 196.248282,1122.39347 C196.197615,1122.3648 196.146948,1122.33613 196.096282,1122.30813 C196.034282,1122.27413 195.972282,1122.2408 195.909615,1122.2068 C195.858948,1122.18013 195.808282,1122.1528 195.756948,1122.1268 C195.694948,1122.09413 195.632282,1122.0628 195.568948,1122.03147 C195.517615,1122.00547 195.466948,1121.97947 195.415615,1121.95413 C195.352282,1121.92413 195.288948,1121.89413 195.226948,1121.86413 C195.174282,1121.84013 195.122948,1121.8148 195.070948,1121.7908 C195.007615,1121.76213 194.944948,1121.73413 194.881615,1121.70547 C194.829615,1121.6828 194.777615,1121.65947 194.724948,1121.6368 L194.534948,1121.5568 C194.482282,1121.53547 194.429615,1121.5128 194.376948,1121.49147 C194.313615,1121.46613 194.250282,1121.4408 194.186948,1121.41613 C194.134282,1121.39547 194.081615,1121.3748 194.028948,1121.3548 C193.964948,1121.3308 193.900948,1121.30747 193.837615,1121.28413 C193.783615,1121.26413 193.730948,1121.24547 193.677615,1121.2268 C193.614282,1121.20347 193.550282,1121.18147 193.486282,1121.15947 C193.432948,1121.14213 193.380282,1121.12347 193.326948,1121.10613 C193.262948,1121.0848 193.198948,1121.0648 193.134948,1121.04347 C193.081615,1121.0268 193.028282,1121.01013 192.974948,1120.99347 C192.910948,1120.97413 192.846282,1120.95413 192.782282,1120.93547 C192.728948,1120.92013 192.675615,1120.90413 192.622282,1120.88947 C192.558282,1120.8708 192.494282,1120.8528 192.429615,1120.83547 C192.376282,1120.82013 192.322948,1120.80613 192.269615,1120.79213 C192.204948,1120.77547 192.140948,1120.7588 192.076948,1120.74213 C192.023615,1120.7288 191.970282,1120.71547 191.917615,1120.7028 C191.852282,1120.6868 191.787615,1120.67147 191.723615,1120.65613 C191.670948,1120.64413 191.617615,1120.63147 191.564282,1120.62013 L191.370948,1120.5768 C191.318282,1120.56547 191.264948,1120.55547 191.212282,1120.54413 C191.147615,1120.5308 191.083615,1120.51747 191.018948,1120.50547 C190.966282,1120.4948 190.913615,1120.4848 190.860948,1120.47547 C190.796282,1120.4628 190.731615,1120.45147 190.667615,1120.43947 C190.615615,1120.43013 190.562282,1120.42213 190.510282,1120.4128 C190.446282,1120.40147 190.381615,1120.3908 190.316948,1120.3808 C190.264948,1120.37213 190.212948,1120.3648 190.161615,1120.3568 C190.096948,1120.3468 190.032282,1120.33747 189.967615,1120.32813 C189.916282,1120.32013 189.864948,1120.31413 189.812948,1120.3068 C189.748948,1120.29813 189.684282,1120.2888 189.620282,1120.28147 C189.568948,1120.2748 189.518282,1120.2688 189.466948,1120.2628 C189.402282,1120.25547 189.338282,1120.24747 189.273615,1120.24013 C189.224282,1120.23413 189.174282,1120.23013 189.124282,1120.2248 C189.059615,1120.21813 188.994282,1120.2108 188.928948,1120.20413 C188.880948,1120.20013 188.833615,1120.19613 188.784948,1120.19213 C188.718948,1120.18613 188.652948,1120.18013 188.586948,1120.1748 L188.448282,1120.1648 C188.380948,1120.15947 188.313615,1120.15413 188.247615,1120.14947 C188.202282,1120.14747 188.158282,1120.1448 188.114282,1120.14213 C188.046282,1120.13813 187.977615,1120.13347 187.910282,1120.13013 C187.869615,1120.12813 187.830282,1120.1268 187.789615,1120.1248 C187.718282,1120.12147 187.646282,1120.11813 187.575615,1120.11547 C187.548948,1120.1148 187.522282,1120.11413 187.496282,1120.1128 C187.220948,1120.10347 186.948948,1120.09813 186.680282,1120.09747 C186.652948,1120.09747 186.625615,1120.0968 186.598948,1120.0968 C186.531615,1120.0968 186.464948,1120.09747 186.397615,1120.09813 C186.357615,1120.0988 186.316948,1120.0988 186.277615,1120.09947 C186.215615,1120.10013 186.154282,1120.10147 186.092948,1120.1028 C186.048948,1120.10347 186.004282,1120.10413 185.959615,1120.10547 C185.901615,1120.1068 185.844282,1120.1088 185.786948,1120.1108 C185.739615,1120.11213 185.692948,1120.11347 185.645615,1120.1148 C185.588948,1120.11747 185.533615,1120.11947 185.478282,1120.12147 C185.430948,1120.12347 185.384282,1120.12547 185.337615,1120.12747 C185.282282,1120.13013 185.227615,1120.13347 185.172282,1120.13613 C185.125615,1120.1388 185.078948,1120.14147 185.032948,1120.14413 C184.978282,1120.14747 184.925615,1120.15013 184.872282,1120.15347 C184.825615,1120.1568 184.779615,1120.15947 184.732948,1120.1628 L184.576948,1120.1748 C184.530948,1120.17747 184.484282,1120.1808 184.438282,1120.1848 C184.387615,1120.1888 184.337615,1120.19347 184.286948,1120.19747 C184.240948,1120.20147 184.194948,1120.2048 184.148948,1120.2088 C184.099615,1120.21347 184.050948,1120.21813 184.002282,1120.2228 C183.956282,1120.22747 183.910948,1120.23147 183.865615,1120.23547 C183.816948,1120.2408 183.769615,1120.24613 183.721615,1120.2508 C183.676948,1120.25547 183.632282,1120.26013 183.588282,1120.2648 C183.540282,1120.27013 183.494282,1120.27547 183.447615,1120.2808 C183.402948,1120.28613 183.359615,1120.2908 183.314948,1120.29613 C183.270282,1120.30147 183.224948,1120.3068 183.179615,1120.3128 C183.136282,1120.31747 183.092948,1120.3228 183.049615,1120.3288 C183.005615,1120.33413 182.960948,1120.34013 182.917615,1120.34547 C182.874948,1120.35147 182.832948,1120.3568 182.790948,1120.3628 C182.747615,1120.3688 182.704282,1120.3748 182.661615,1120.3808 C182.620282,1120.3868 182.578948,1120.3928 182.538282,1120.39813 C182.496282,1120.40413 182.454948,1120.4108 182.413615,1120.4168 C182.372948,1120.42347 182.332948,1120.4288 182.292948,1120.4348 C182.252282,1120.44147 182.211615,1120.44813 182.171615,1120.45347 C182.132282,1120.46013 182.092948,1120.4668 182.054948,1120.4728 C182.014948,1120.47947 181.976282,1120.48547 181.937615,1120.49213 C181.898948,1120.4988 181.860948,1120.50547 181.822948,1120.5108 C181.784948,1120.51747 181.748282,1120.52413 181.711615,1120.5308 C181.672948,1120.5368 181.635615,1120.54347 181.598282,1120.5508 C181.562282,1120.5568 181.527615,1120.56347 181.492948,1120.56947 C181.455615,1120.57613 181.419615,1120.5828 181.382948,1120.59013 C181.348282,1120.59613 181.313615,1120.6028 181.280282,1120.6088 C181.245615,1120.61613 181.210948,1120.62213 181.176282,1120.6288 L181.076948,1120.64813 C181.042948,1120.6548 181.009615,1120.66213 180.976948,1120.6688 C180.944948,1120.67547 180.913615,1120.6808 180.882282,1120.68747 C180.849615,1120.69413 180.817615,1120.70147 180.785615,1120.70747 C180.755615,1120.71347 180.726282,1120.72013 180.696948,1120.7268 C180.664948,1120.7328 180.634282,1120.73947 180.602948,1120.74613 C180.574948,1120.7528 180.546948,1120.7588 180.518948,1120.76413 C180.488948,1120.77147 180.460282,1120.77747 180.430948,1120.7848 C180.412282,1120.78813 180.392948,1120.79213 180.373615,1120.7968 C179.396948,1121.0168 178.399615,1121.13147 177.398282,1121.13147 L150.477615,1121.13147 C147.060948,1119.87413 144.922948,1121.28147 144.922948,1121.28147 C143.187615,1118.9668 140.982282,1116.1848 138.698282,1113.8248 C138.632282,1113.75747 138.566948,1113.6888 138.501615,1113.62147 C139.114948,1112.22013 138.644282,1110.1108 138.644282,1110.1108 C139.160948,1108.62213 139.616282,1104.18613 137.489615,1103.1528 C135.362948,1102.12013 134.207615,1106.6168 133.582282,1107.80147 C132.956282,1108.9868 132.394282,1108.8048 132.394282,1108.8048 C132.570948,1109.13147 132.496282,1109.45747 132.397615,1109.67947 C131.870282,1109.6868 131.273615,1109.72613 130.614282,1109.74813 C130.067615,1109.76613 129.478282,1109.77213 128.847615,1109.7388 C128.575615,1109.7248 128.296282,1109.70347 128.008282,1109.67213 C127.980282,1109.64613 127.950282,1109.6168 127.916948,1109.58613 C127.852282,1109.52613 127.778282,1109.4568 127.696948,1109.3808 C127.685615,1109.37013 127.672948,1109.35947 127.662282,1109.3488 C127.632948,1109.32147 127.603615,1109.29347 127.572948,1109.26413 C127.557615,1109.24947 127.540282,1109.23347 127.524948,1109.21813 C127.496948,1109.19213 127.469615,1109.16547 127.440948,1109.13747 C127.422282,1109.12013 127.403615,1109.10147 127.385615,1109.08347 C127.357615,1109.05613 127.329615,1109.02813 127.300948,1108.99947 C127.281615,1108.9808 127.262282,1108.9608 127.242948,1108.94147 C127.213615,1108.91147 127.184282,1108.8808 127.154282,1108.85013 L127.097615,1108.79147 C127.064948,1108.75747 127.032282,1108.72213 126.999615,1108.68613 C126.982948,1108.66947 126.967615,1108.65213 126.950948,1108.6348 C126.902282,1108.58147 126.853615,1108.5268 126.805615,1108.4708 C126.803615,1108.4688 126.802282,1108.4668 126.800282,1108.4648 C126.754282,1108.41147 126.708282,1108.3568 126.662948,1108.30147 C126.646948,1108.2828 126.632948,1108.26347 126.617615,1108.2448 C126.586282,1108.20547 126.554948,1108.16613 126.524282,1108.12547 C126.506282,1108.1028 126.489615,1108.08013 126.472282,1108.0568 C126.444948,1108.01947 126.417615,1107.98213 126.390948,1107.9448 C126.372948,1107.92013 126.356282,1107.89547 126.338948,1107.87013 C126.312948,1107.83347 126.288282,1107.79547 126.264282,1107.75813 C126.248282,1107.73213 126.231615,1107.7068 126.216282,1107.68147 C126.192282,1107.64347 126.169615,1107.60413 126.146282,1107.5648 C126.132282,1107.54013 126.117615,1107.51547 126.104282,1107.4908 C126.080948,1107.44813 126.059615,1107.4048 126.037615,1107.36213 C126.026948,1107.3408 126.015615,1107.3188 126.005615,1107.29747 C125.975615,1107.2328 125.946948,1107.16813 125.921615,1107.1028 C125.366282,1105.67547 123.603615,1102.9708 122.175615,1103.57813 C120.747615,1104.18613 121.020948,1107.83213 121.020948,1107.83213 C121.020948,1107.83213 121.222282,1109.07813 121,1109.38147 C121,1109.38147 121.385615,1109.74613 121.537615,1110.50613 C121.669615,1111.16547 121.247615,1113.33947 122.320948,1114.25613 C122.071615,1114.7748 121.936948,1115.12013 121.936948,1115.12013 C121.936948,1115.12013 122.266948,1116.3908 121.172948,1116.7148 C121.172948,1116.7148 122.590948,1116.7148 122.388282,1117.5648 C122.185615,1118.41613 121.780948,1120.2568 121.982948,1121.28147 C121.982948,1121.28147 121.989615,1121.27213 122.000948,1121.25813 C122.012282,1121.24213 122.030282,1121.22013 122.052282,1121.19413 C122.064948,1121.17947 122.078948,1121.16347 122.094282,1121.14747 C122.112282,1121.12747 122.131615,1121.10813 122.152948,1121.08813 C122.164948,1121.07613 122.177615,1121.0648 122.190948,1121.05347 C122.243615,1121.0068 122.303615,1120.96213 122.366282,1120.93147 C122.398948,1120.91547 122.433615,1120.9028 122.468282,1120.89613 C122.487615,1120.89147 122.506948,1120.8888 122.526948,1120.88813 C122.546948,1120.88747 122.566948,1120.89013 122.587615,1120.89413 C122.593615,1120.89547 122.600948,1120.89613 122.607615,1120.89813 C122.630282,1120.90413 122.652948,1120.91547 122.674948,1120.9288 C122.678948,1120.9308 122.682948,1120.9328 122.686282,1120.93547 C122.691615,1120.9388 122.696282,1120.9428 122.700282,1120.9468 C122.708948,1120.9528 122.716948,1120.95813 122.724948,1120.96547 C122.726948,1120.9668 122.727615,1120.9688 122.729615,1120.9708 C122.753615,1120.9928 122.776282,1121.01947 122.798282,1121.0528 C122.816948,1121.0808 122.834948,1121.11413 122.852282,1121.1508 C122.856948,1121.16013 122.861615,1121.1688 122.865615,1121.17813 C122.866948,1121.18213 122.868948,1121.18747 122.870948,1121.19213 C122.900282,1121.2628 122.927615,1121.34747 122.951615,1121.44947 C122.963615,1121.49813 122.971615,1121.54747 122.979615,1121.5968 C122.984948,1121.6328 122.990282,1121.6688 122.994948,1121.70413 C123.014948,1121.8788 123.018282,1122.0548 123.003615,1122.23013 C122.960948,1122.7268 122.885615,1123.88613 122.935615,1125.42413 L122.935615,1125.4248 C122.936282,1125.43147 122.936282,1125.43947 122.936948,1125.44747 C122.938948,1125.52013 122.942282,1125.59347 122.944948,1125.6688 L122.948948,1125.7568 C122.950948,1125.8108 122.952948,1125.8648 122.955615,1125.91947 C122.957615,1125.95347 122.959615,1125.98747 122.960948,1126.02213 C122.964282,1126.07347 122.966948,1126.1248 122.969615,1126.1768 C122.971615,1126.2128 122.974282,1126.24947 122.976282,1126.28547 C122.978948,1126.33747 122.982282,1126.38947 122.985615,1126.44213 C122.988282,1126.4788 122.990948,1126.51547 122.992948,1126.5528 C122.996948,1126.60613 123.000948,1126.66013 123.004948,1126.71413 C123.006948,1126.7508 123.010282,1126.7868 123.012948,1126.82347 C123.017615,1126.8828 123.022948,1126.94347 123.027615,1127.00347 C123.030282,1127.03547 123.032948,1127.06547 123.034948,1127.09747 C123.043615,1127.19013 123.052282,1127.2828 123.060948,1127.37613 C123.060948,1127.3788 123.060948,1127.38213 123.061615,1127.3848 C123.070282,1127.47613 123.079615,1127.56747 123.088948,1127.65947 C123.092282,1127.6908 123.096282,1127.7228 123.099615,1127.75413 C123.106948,1127.81813 123.114282,1127.8828 123.120948,1127.94813 C123.125615,1127.9848 123.130282,1128.0228 123.134948,1128.0608 C123.142282,1128.12013 123.148948,1128.18013 123.156948,1128.2408 C123.161615,1128.2808 123.166948,1128.32013 123.172282,1128.36013 C123.179615,1128.41947 123.187615,1128.47947 123.196282,1128.5388 C123.200948,1128.57947 123.206948,1128.62013 123.212282,1128.66013 C123.220948,1128.72147 123.229615,1128.78347 123.238948,1128.84413 C123.244948,1128.88347 123.250948,1128.9228 123.256282,1128.96213 C123.266948,1129.02947 123.277615,1129.0968 123.288282,1129.1648 C123.293615,1129.1988 123.298948,1129.23147 123.304282,1129.26547 C123.320282,1129.36747 123.338282,1129.46947 123.355615,1129.57213 C123.355615,1129.57213 124.252282,1136.40347 127.106948,1139.1188 C127.106948,1139.1188 126.925615,1138.65613 126.978282,1138.34413 C131.507615,1144.41147 134.722948,1144.68413 134.722948,1144.68413 L136.100948,1147.25147 L136.052282,1147.49547 C135.956948,1147.51213 135.856282,1147.5328 135.751615,1147.5588 C135.490948,1147.62147 135.208282,1147.71547 134.943615,1147.85347 C134.890948,1147.8808 134.838948,1147.91013 134.786948,1147.94147 C134.696282,1147.99747 134.608282,1148.06013 134.524948,1148.12813 C134.426282,1148.2088 134.334948,1148.29813 134.253615,1148.39813 C134.092282,1148.59413 133.968948,1148.82947 133.904282,1149.11213 C133.862948,1149.29147 133.956282,1149.4648 134.109615,1149.54013 C134.160282,1149.56547 134.218282,1149.58013 134.279615,1149.58013 L136.833615,1149.58013 C136.791615,1149.67547 136.755615,1149.77147 136.726948,1149.87013 C136.707615,1149.93547 136.691615,1150.00213 136.677615,1150.0688 L136.668282,1150.11947 C136.665615,1150.13547 136.662282,1150.1528 136.659615,1150.17613 C136.653615,1150.21947 136.654948,1150.26413 136.660282,1150.30813 C136.682282,1150.4828 136.800282,1150.64147 136.962282,1150.71347 C137.002948,1150.73147 137.044948,1150.74547 137.088948,1150.75213 C137.130282,1150.76013 137.180948,1150.75947 137.208282,1150.75947 L137.792282,1150.7588 L139.349615,1150.75413 L142.464948,1150.74547 L142.659615,1150.7448 L142.756948,1150.74413 C142.790948,1150.74413 142.816948,1150.74547 142.864282,1150.7428 C143.032948,1150.73013 143.194282,1150.62747 143.272282,1150.47213 C143.290948,1150.43547 143.306948,1150.3868 143.312948,1150.35747 C143.321615,1150.32413 143.330948,1150.2908 143.337615,1150.25813 C143.352282,1150.1908 143.364282,1150.12413 143.372948,1150.05747 C143.392282,1149.92347 143.400948,1149.7888 143.404282,1149.6548 C143.408282,1149.13947 143.332948,1148.63813 143.204948,1148.1428 C143.716282,1147.62547 144.106282,1147.0028 144.391615,1146.34413 C144.546282,1145.9868 144.672282,1145.6188 144.776282,1145.24413 C145.059615,1146.09213 144.690948,1146.93747 144.690948,1146.93747 C146.686948,1146.6048 148.124282,1145.25347 148.124282,1145.25347 C148.930948,1145.53813 149.314282,1145.53947 149.314282,1145.53947 C149.932282,1145.15947 150.477615,1145.25347 150.477615,1145.25347 L177.338282,1145.25347 C178.170282,1145.25347 177.615615,1145.80813 177.615615,1145.80813 C179.468948,1145.80813 180.906282,1144.2348 180.906282,1144.2348 L180.666948,1144.96947 C183.565615,1143.78147 183.803615,1143.87613 183.803615,1143.87613 C183.751615,1144.12547 183.613615,1144.2668 183.613615,1144.2668 C183.714282,1144.22547 183.811615,1144.18213 183.906948,1144.1388 C183.935615,1144.12547 183.962282,1144.11213 183.990948,1144.0988 C184.056282,1144.06813 184.120948,1144.03813 184.183615,1144.00747 C184.215615,1143.99147 184.245615,1143.97613 184.276948,1143.95947 C184.333615,1143.9308 184.390282,1143.9028 184.444282,1143.87347 C184.476948,1143.8568 184.506282,1143.84013 184.537615,1143.82213 C184.588948,1143.7948 184.640282,1143.7668 184.688948,1143.7388 C184.720282,1143.72147 184.748948,1143.70347 184.779615,1143.68613 C184.826282,1143.65813 184.873615,1143.6308 184.918948,1143.60347 C184.948948,1143.5848 184.977615,1143.56613 185.006948,1143.54747 C185.048948,1143.52147 185.091615,1143.4948 185.132282,1143.46813 C185.162948,1143.4488 185.190948,1143.4288 185.220282,1143.40947 C185.256948,1143.38413 185.295615,1143.35947 185.331615,1143.33413 C185.361615,1143.31347 185.389615,1143.2928 185.418282,1143.27213 C185.450948,1143.2488 185.484282,1143.22547 185.515615,1143.20213 C185.545615,1143.17947 185.572948,1143.15813 185.601615,1143.1368 C185.629615,1143.11547 185.658948,1143.0928 185.686282,1143.07147 C185.715615,1143.0488 185.742948,1143.0268 185.770948,1143.00413 C185.794948,1142.98413 185.819615,1142.9648 185.842948,1142.94547 C185.872282,1142.9208 185.900282,1142.8968 185.928282,1142.87213 C185.947615,1142.85613 185.967615,1142.83947 185.985615,1142.8228 C186.015615,1142.7968 186.043615,1142.77147 186.071615,1142.74547 C186.086282,1142.73213 186.101615,1142.7188 186.116282,1142.70547 C186.144948,1142.67747 186.172948,1142.6508 186.200948,1142.62413 C186.211615,1142.61413 186.222948,1142.60347 186.232948,1142.59347 C186.262282,1142.5648 186.290282,1142.5368 186.317615,1142.5088 C186.324282,1142.50213 186.331615,1142.4948 186.337615,1142.48813 C186.366948,1142.45747 186.394282,1142.42813 186.420948,1142.40013 C186.423615,1142.3968 186.426948,1142.39347 186.430282,1142.39013 C186.436282,1142.38347 186.442948,1142.37613 186.448948,1142.37013 C186.756282,1142.7168 187.084948,1143.04613 187.442282,1143.34613 L187.692282,1143.55213 C187.778282,1143.61813 187.868282,1143.6768 187.956282,1143.74013 C188.044948,1143.8028 188.132948,1143.86613 188.228948,1143.91747 C188.323615,1143.97147 188.415615,1144.03013 188.512282,1144.07947 L188.809615,1144.21947 C188.913615,1144.25747 189.014948,1144.2988 189.120282,1144.33147 C189.228282,1144.36013 189.334282,1144.3928 189.446948,1144.40813 L189.530282,1144.42213 L189.616282,1144.4288 C189.634282,1144.43013 189.652282,1144.43147 189.671615,1144.43213 C189.717615,1144.80947 189.752948,1145.19013 189.778948,1145.56947 C189.806948,1145.9868 189.822948,1146.40547 189.818948,1146.82213 C189.813615,1147.23813 189.791615,1147.6548 189.719615,1148.05747 C189.683615,1148.25813 189.634282,1148.45547 189.556948,1148.6328 C189.484282,1148.79813 189.377615,1148.93813 189.248282,1149.00147 C188.943615,1148.94413 188.644948,1148.92213 188.338948,1148.93213 C188.019615,1148.94547 187.694282,1149.00013 187.388948,1149.12947 C187.236282,1149.1948 187.089615,1149.28013 186.958948,1149.38747 C186.828948,1149.49547 186.716282,1149.62547 186.628282,1149.76947 C186.540948,1149.91413 186.473615,1150.07013 186.433615,1150.2308 C186.427615,1150.25147 186.422282,1150.2688 186.416948,1150.29213 C186.412948,1150.3168 186.406948,1150.34147 186.405615,1150.3668 C186.401615,1150.4168 186.402282,1150.46747 186.412282,1150.5168 C186.429615,1150.61613 186.472282,1150.7108 186.536282,1150.7868 C186.600282,1150.86413 186.683615,1150.9248 186.777615,1150.9608 C186.823615,1150.97947 186.872948,1150.99013 186.922282,1150.99613 C186.946948,1150.99813 186.974948,1151.00013 186.994948,1151.00013 L187.052948,1151.00013 L187.516282,1150.9988 L190.296282,1150.99347 L192.149615,1150.99013 L193.076282,1150.98813 L193.192282,1150.98813 C193.232948,1150.98747 193.262948,1150.98947 193.316282,1150.98613 C193.414282,1150.97947 193.510282,1150.94613 193.590948,1150.89147 C193.672282,1150.83747 193.740282,1150.76147 193.783615,1150.67413 C193.806282,1150.63013 193.822282,1150.58347 193.832282,1150.53613 C193.837615,1150.50947 193.839615,1150.4908 193.842948,1150.47213 L193.851615,1150.41547 L193.978948,1149.58013 L195.523615,1149.58013 C195.557615,1149.58013 195.590282,1149.5788 195.623615,1149.57613 C195.689615,1149.57147 195.755615,1149.56213 195.818948,1149.54747 C195.850948,1149.54013 195.882282,1149.53213 195.913615,1149.5228 C196.037615,1149.4848 196.155615,1149.42947 196.263615,1149.35947 C196.290282,1149.34213 196.316948,1149.3228 196.342282,1149.30347 C196.444948,1149.22547 196.536282,1149.13213 196.613615,1149.0268 C196.652282,1148.97413 196.686948,1148.91813 196.718282,1148.85947 C196.732948,1148.82947 196.748282,1148.79947 196.760948,1148.7688 C196.803615,1148.67147 196.848282,1148.56613 196.894948,1148.45747 C196.949615,1148.33013 197.005615,1148.1968 197.062282,1148.05813 C197.112282,1147.93813 197.162282,1147.81613 197.212282,1147.6908 C197.307615,1147.45347 197.402282,1147.2088 197.492282,1146.96613 C197.967615,1145.68213 198.204948,1143.97147 198.204948,1143.97147 C198.319615,1143.91813 198.431615,1143.86213 198.542948,1143.8048 L198.636948,1143.75613 C198.722282,1143.7108 198.806282,1143.6648 198.890282,1143.61813 C198.917615,1143.60213 198.945615,1143.58747 198.972948,1143.57147 C199.195615,1143.44347 199.412282,1143.30813 199.622282,1143.16547 C199.635615,1143.15613 199.648282,1143.14747 199.662282,1143.13813 C199.759615,1143.0708 199.856282,1143.0028 199.950282,1142.93213 C199.960282,1142.92613 199.970282,1142.9188 199.978948,1142.91147 C203.094948,1140.5948 204.684282,1136.62613 203.729615,1132.29747 C203.727615,1132.2888 203.726948,1132.2808 203.724948,1132.27213 C203.703615,1132.18013 203.681615,1132.08813 203.658948,1131.99547 C203.654282,1131.97613 203.649615,1131.95613 203.644282,1131.9368 C203.623615,1131.85147 203.600282,1131.76613 203.576948,1131.6808 C203.569615,1131.65413 203.562282,1131.6268 203.554948,1131.60013 C203.532948,1131.52013 203.508282,1131.44013 203.484282,1131.36013 C203.474948,1131.32747 203.464948,1131.29413 203.454282,1131.26147 C203.430948,1131.18547 203.405615,1131.10947 203.380948,1131.03347 C203.368282,1130.9968 203.356282,1130.95947 203.343615,1130.9228 C203.318282,1130.84947 203.292282,1130.7768 203.266282,1130.70347 C203.252282,1130.66347 203.236948,1130.62213 203.222282,1130.58213 C203.196282,1130.51147 203.168948,1130.44147 203.141615,1130.3708 C203.124282,1130.32747 203.106948,1130.2848 203.089615,1130.2408 C203.061615,1130.1728 203.033615,1130.10413 203.005615,1130.03613 L202.946948,1129.8988 C202.918282,1129.8328 202.888282,1129.76613 202.858282,1129.69947 C202.836948,1129.65147 202.814282,1129.60413 202.792282,1129.55747 C202.762282,1129.49213 202.731615,1129.4268 202.700282,1129.36213 C202.676282,1129.3128 202.651615,1129.26347 202.627615,1129.21413 C202.595615,1129.15013 202.563615,1129.0868 202.531615,1129.02347 C202.505615,1128.9728 202.477615,1128.92213 202.450948,1128.8708 C202.418282,1128.8088 202.384948,1128.74613 202.350948,1128.68347 C202.322282,1128.63213 202.292948,1128.58013 202.263615,1128.52813 C202.228948,1128.4668 202.194948,1128.40547 202.159615,1128.34413 C202.128282,1128.2908 202.096282,1128.23747 202.064282,1128.18413 C202.028948,1128.12413 201.992948,1128.0648 201.956282,1128.0048 C201.922282,1127.95013 201.888282,1127.89547 201.853615,1127.8408 C201.816282,1127.78213 201.780282,1127.72347 201.741615,1127.66413 C201.705615,1127.60813 201.668282,1127.5528 201.630948,1127.4968 L201.626948,1127.4908 L201.919615,1127.5228 C202.022282,1127.53213 202.124948,1127.53613 202.227615,1127.54213 C203.872282,1127.6528 205.534948,1127.52547 207.148948,1127.17947 C207.958282,1127.0128 208.754948,1126.7868 209.536282,1126.52147 C210.318282,1126.2568 211.086282,1125.94813 211.835615,1125.6008 C212.584948,1125.25347 213.315615,1124.8668 214.026948,1124.44413 C214.382282,1124.2328 214.731615,1124.01213 215.074948,1123.7808 C215.418948,1123.54813 215.754282,1123.3108 216.082282,1123.04547 C216.116282,1123.01813 216.138282,1122.97747 216.140282,1122.9308 C216.144282,1122.84413 216.077615,1122.77147 215.990948,1122.76747 L215.988282,1122.76747 L215.101615,1122.72813 C215.774948,1121.4288 216.294282,1120.0488 216.623615,1118.6208 L216.736282,1118.0508 C216.754282,1117.95547 216.774948,1117.86147 216.790282,1117.76547 L216.831615,1117.47813 C216.856948,1117.28613 216.890282,1117.09413 216.908948,1116.90147 L216.960282,1116.3228 C217.010282,1115.55013 217.017615,1114.7728 216.956948,1114.00013" id="Fill-1"></path>
                    </g>
                </g>
            </svg>
        </div>)
        return (
            <div style={{margin: "5px"}}>
                {uncommon}
                <div style={{marginLeft:"20px", fontSize:"1.5rem"}}>
                    {corgi.name} <TiDelete onClick={this.deleteCorgi} style={{marginLeft:"5px", color:"#ff4143",fontSize: "2rem" }}/>
                </div>
            </div>
        )
    }
}

export default CreationProfile