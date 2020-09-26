function UpdateTEA(){

//Inputs from User Input
// Set Up Input Array & Define Initial Baseline Inputs & Outputs.
// Input    0-productName,                1-productFormula      2-productMW,              3-theorYield,           4-productYieldCoefficientNH3,
//          5-productYieldCoefficientO2,  6-vesselSize,         7-sellingPrice,           8-margin,               9-paybackPeriod,
//          10-discountRate,              11-taxRate,           12-percentDebtFinanced,   13-DebtInterestRate,    14-LoanTerm,
//          15-plantCapacity,             16-annualUptime,      17-batchOnSpec,           18-glucoseCost,         19-ammoniaCost,
//          20-naturalGasCost,            21-electricityCost    22-CEPCI,                 23-aveVolumtericRate,   24-Titer,
//          25-Yield,                     26-turnaroundTime,    27-mediaCost              28-Temperature,         29-overallDSPYield,
//          30-dspPercentofOpex,          31-dspPercentofCapex ];

slider = [];
pageInput=[];
Input = [];
pageInput =[];

//Update Vessel Size  & Associated Page Outputs
vesselSize =  UpdateVesselSize();
Input[6] = parseFloat(vesselSize);

//Update  Chemistry  & Associated Page Outputs
myChemical = UpdateChemical();
myChemicalEquation = balanceEquation(myChemical);
Input[0] = myChemical.name;
Input[1] = myChemical.formula;
Input[2] = parseFloat(myChemical.MW);
Input[3] = parseFloat(myChemicalEquation.theorYield);
Input[4] = parseFloat(myChemicalEquation.productYieldCoefficientNH3);
Input[5] = parseFloat(myChemicalEquation.productYieldCoefficientO2);

//Update Selling Price
Input[7] = document.getElementById("sellingPrice1").value;
document.getElementById("sellingPrice2").innerHTML =Input[7];

//Update Sliders & Associated Page Outputs

    for(let i=0; i< 24; i++){
        pageInput[i] = document.getElementById("demo"+i);
        Input[i+8]= parseFloat(pageInput[i].innerHTML);
    }
     document.getElementById("Margin").innerHTML = Input[8];
     document.getElementById("Rate").innerHTML = Input[23];
     document.getElementById("Titer").innerHTML = Input[24];
     document.getElementById("dspYield").innerHTML = Input[29]/100;

//Calculate Bioprocess Outputs & Associated Page Outputs
    bioprocessOutputs = bioprocessopexcapex(Input);

     var myFermChart = FermChart(bioprocessOutputs);
     if (myFermChart) {
          myFermChart.destroy();
     }

     document.getElementById("fermYield").innerHTML = (parseFloat(bioprocessOutputs.overallFermYield)).toFixed(3);
     document.getElementById("specificRate").innerHTML = parseFloat(bioprocessOutputs.specificRate).toFixed(2);
     document.getElementById("finalBiomass").innerHTML = parseFloat(bioprocessOutputs.finalBiomass).toFixed(2);
     document.getElementById("fermTime").innerHTML = parseFloat(bioprocessOutputs.fermTime).toFixed(0);
     document.getElementById("maxOTR").innerHTML = parseFloat(bioprocessOutputs.maxOTR).toFixed(2);
     document.getElementById("maxKla").innerHTML = parseFloat(bioprocessOutputs.maxKla).toFixed(2);
     document.getElementById("maxCooling").innerHTML = parseFloat(bioprocessOutputs.maxCoolingRate).toFixed(2);
     document.getElementById("overallYield").innerHTML = ((Input[29]/100)*(parseFloat(bioprocessOutputs.overallFermYield))).toFixed(2);
     document.getElementById("OPEX").innerHTML = bioprocessOutputs.opexperkg.toFixed(2);
     document.getElementById("CAPEX").innerHTML = bioprocessOutputs.capexperkg.toFixed(2);
     document.getElementById("TCI").innerHTML = (bioprocessOutputs.totaCapitalInvestment/1000000).toFixed(2);
     document.getElementById("plantCapacity").innerHTML = (bioprocessOutputs.plantCapacity/1000000).toFixed(2);
     MSP = (bioprocessOutputs.opexperkg/(1-(Input[8]/100))).toFixed(2);



//Update Selling Price & Associated Page Outputs

//Calculate DCF
     DCFOutput = BOO_DCF(Input,bioprocessOutputs);

          document.getElementById("NPV").innerHTML = (DCFOutput.NPV/1000000).toFixed(2);
          document.getElementById("ROI").innerHTML = ((DCFOutput.ROI)*100).toFixed(2);
          document.getElementById("IRR").innerHTML = ((DCFOutput.IRR)*100).toFixed(2);
          document.getElementById("MSP").innerHTML = ((DCFOutput.MSP)).toFixed(2);
          time = DCFOutput.time;
          cumCashFlow = DCFOutput.cumCashFlow;


              var myProFormaChart = ProFormaChart(time,cumCashFlow);
              if(myProFormaChart){
               myProFormaChart.destroy();
               }
              var myOpexPieChart = OpexPieChart(bioprocessOutputs);
               if(myOpexPieChart){
                myOpexPieChart.destroy();
               }
              var myCapexPieChart1 = CapexPieChart1(bioprocessOutputs);
               if(myCapexPieChart1){
                myCapexPieChart1.destroy();
               }


 // Pull Process Inputs into hidden submission Form
       document.getElementById('productName').value =Input[0];
       document.getElementById('productFormula').value = Input[1];
       document.getElementById('productMW').value = Input[2];
       document.getElementById('productTheorYield').value = Input[3];
       document.getElementById('productYieldCoefficientNH3').value = Input[4];
       document.getElementById('productYieldCoefficientO2').value = Input[5];
       document.getElementById('productVesselSize').value = Input[6];
       document.getElementById('productSellingPrice').value = Input[7];
       document.getElementById('productMargin').value = Input[8];
       document.getElementById('productPaybackPeriod').value = Input[9];
       document.getElementById('productDiscountRate').value = Input[10];
       document.getElementById('productTaxRate').value = Input[11];
       document.getElementById('productPercentDebtFinanced').value = Input[12];
       document.getElementById('productDebtInterestRate').value = Input[13];
       document.getElementById('productLoanTerm').value = Input[14];
       document.getElementById('productPlantCapacity').value = Input[15];
       document.getElementById('productAnnualUptime').value = Input[16];
       document.getElementById('productBatchOnSpec').value = Input[17];
       document.getElementById('productGlucoseCost').value = Input[18];
       document.getElementById('productAmmoniaCost').value = Input[19];
       document.getElementById('productNaturalGasCost').value = Input[20];
       document.getElementById('productElectricityCost').value = Input[21];
       document.getElementById('productCEPCI').value = Input[22];
       document.getElementById('productAveVolumtericRate').value= Input[23];
       document.getElementById('productTiter').value = Input[24];
       document.getElementById('productYield').value = Input[25];
       document.getElementById('productTurnaroundTime').value = Input[26];
       document.getElementById('productMediaCost').value = Input[27];
       document.getElementById('productTemperature').value = Input[28];
       document.getElementById('productOverallDSPYield').value = Input[29];
       document.getElementById('productDspPercentofOpex').value = Input[30];
       document.getElementById('productDspPercentofCapex').value = Input[31];

 // Pull Process Inputs into hidden submission Form

       document.getElementById('productOPEX').value =bioprocessOutputs.opexperkg.toFixed(2);
       document.getElementById('productCAPEX').value = bioprocessOutputs.capexperkg.toFixed(2);
       document.getElementById('productTCI').value =  (bioprocessOutputs.totaCapitalInvestment/1000000).toFixed(2);
       document.getElementById('productNPV').value = DCFOutput.NPV.toFixed(2);
       document.getElementById('productROI').value = DCFOutput.ROI.toFixed(2);
       document.getElementById('productIRR').value = DCFOutput.IRR.toFixed(2);
       document.getElementById('productMSP').value = DCFOutput.MSP.toFixed(2);
       document.getElementById('productOptimalPlantCapacity').value = (bioprocessOutputs.plantCapacity/1000000).toFixed(2);
       document.getElementById('productFermentationYield').value =  (parseFloat(bioprocessOutputs.overallFermYield)).toFixed(3);
       document.getElementById('productFinalBiomass').value = parseFloat(bioprocessOutputs.finalBiomass).toFixed(2);
       document.getElementById('productSpRate').value = parseFloat(bioprocessOutputs.specificRate).toFixed(2);
       document.getElementById('productFermTime').value =parseFloat(bioprocessOutputs.fermTime).toFixed(0);
       document.getElementById('productMaxOTR').value =parseFloat(bioprocessOutputs.maxOTR).toFixed(2);
       document.getElementById('productMaxKLA').value =parseFloat(bioprocessOutputs.maxKla).toFixed(2);
       document.getElementById('productMaxCoolingRate').value =parseFloat(bioprocessOutputs.maxCoolingRate).toFixed(2);
       document.getElementById('productOverallYield').value = ((Input[29]/100)*(parseFloat(bioprocessOutputs.overallFermYield))).toFixed(2);
       document.getElementById('productFermTimeCourseTime').value = bioprocessOutputs.time.toString();
       document.getElementById('productFermTimeCourseBiomass').value = bioprocessOutputs.biomass.toString();
       document.getElementById('productFermTimeCourseProductTiter').value = bioprocessOutputs.productTiter.toString();

       DCFOutput_time = DCFOutput.time;
       DCFOutput_revenue = DCFOutput.revenue;
       DCFOutput_COGS = DCFOutput.COGS;
       DCFOutput_totalDepreciation =DCFOutput.totalDepreciation;
       DCFOutput_EBITDA =DCFOutput.EBITDA;
       DCFOutput_EBIT = DCFOutput.EBIT;
       DCFOutput_PrincipalPaid = DCFOutput.PrincipalPaid;
       DCFOutput_InterestPaid = DCFOutput.InterestPaid;
       DCFOutput_TaxesPaid = DCFOutput.TaxesPaid;
       DCFOutput_netIncome = DCFOutput.netIncome;
       DCFOutput_netCashFlow = DCFOutput.netCashFlow;
       DCFOutput_cumCashFlow = DCFOutput.cumCashFlow;

       document.getElementById('productProFormaTime').value = DCFOutput_time.toString();
       document.getElementById('productProFormaRevenue').value = DCFOutput_revenue.toString();
       document.getElementById('productProFormaCOGS').value = DCFOutput_COGS.toString();
       document.getElementById('productProFormaDepreciation').value = DCFOutput_totalDepreciation.toString();
       document.getElementById('productProFormaEBITDA').value = DCFOutput_EBITDA.toString();
       document.getElementById('productProFormaEBIT').value = DCFOutput_EBIT.toString();
       document.getElementById('productProFormaPrincipal').value = DCFOutput_PrincipalPaid.toString();
       document.getElementById('productProFormaInterest').value = DCFOutput_InterestPaid.toString();
       document.getElementById('productProFormaTaxes').value = DCFOutput_TaxesPaid.toString();
       document.getElementById('productProFormaNetIncome').value = DCFOutput_netIncome.toString();
       document.getElementById('productProFormaNetCashFlow').value = DCFOutput_netCashFlow.toString();
       document.getElementById('productProFormaCumCashFlow').value = DCFOutput_cumCashFlow.toString();


 // Pull Bioprocess CAPEX Outputs into hidden submission Form

      document.getElementById('MainFermAreaEquip').value = (bioprocessOutputs.MainFermAreaEquip).toFixed(2);
      document.getElementById('MainFermAreaTIC').value = (bioprocessOutputs.MainFermAreaTIC).toFixed(2);
      document.getElementById('fermenterCost').value =(bioprocessOutputs.fermenterCost).toFixed(2);
      document.getElementById('fermenterTIC').value =(bioprocessOutputs.fermenterTIC).toFixed(2);
      document.getElementById('fermenterAgitatorCost').value =(bioprocessOutputs.fermenterAgitatorCost).toFixed(2);
      document.getElementById('fermenterAgitatorTIC').value =(bioprocessOutputs.fermenterAgitatorTIC).toFixed(2);
      document.getElementById('airBlowerCost').value =(bioprocessOutputs.airBlowerCost).toFixed(2);
      document.getElementById('airBlowerTIC').value =(bioprocessOutputs.airBlowerTIC).toFixed(2);
      document.getElementById('FermTransferPumpsCost').value =(bioprocessOutputs.TransferPumpsCost).toFixed(2);
      document.getElementById('FermTransferPumpsTIC').value =(bioprocessOutputs.TransferPumpsTIC).toFixed(2);
      document.getElementById('mainFermPiping').value =(bioprocessOutputs.mainFermPiping).toFixed(2);
      document.getElementById('mainFermTanksEquip').value = (bioprocessOutputs.mainFermEquip).toFixed(2);
      document.getElementById('mainFermTanksTIC').value =(bioprocessOutputs.mainFermTIC).toFixed(2);
      document.getElementById('glucoseStorageTankCost').value =(bioprocessOutputs.glucoseStorageTankCost).toFixed(2);
      document.getElementById('glucoseStorageTankTIC').value =(bioprocessOutputs.glucoseStorageTankTIC).toFixed(2);
      document.getElementById('glucoseStorageTransferPumpsCost').value =(bioprocessOutputs.glucoseStorageTransferPumpsCost).toFixed(2);
      document.getElementById('glucoseStorageTransferPumpsTIC').value = (bioprocessOutputs.glucoseStorageTransferPumpsTIC).toFixed(2);
      document.getElementById('glucoseStoragepiping').value =(bioprocessOutputs.glucoseStoragepiping).toFixed(2);
      document.getElementById('glucoseStorageEquip').value = (bioprocessOutputs.glucoseStorageEquip).toFixed(2);
      document.getElementById('glucoseStorageTIC').value =(bioprocessOutputs.glucoseStorageTIC).toFixed(2);
      document.getElementById('ammoniaStorageTankCost').value = (bioprocessOutputs.ammoniaStorageTankCost).toFixed(2);
      document.getElementById('ammoniaStorageTankTIC').value =(bioprocessOutputs.ammoniaStorageTankTIC).toFixed(2);
      document.getElementById('acidStorageTankCost').value = (bioprocessOutputs.acidStorageTankCost).toFixed(2);
      document.getElementById('acidStorageTankTIC').value =(bioprocessOutputs.acidStorageTankTIC).toFixed(2);
      document.getElementById('ammoniaTransferPumpsCost').value = (bioprocessOutputs.ammoniaTransferPumpsCost).toFixed(2);
      document.getElementById('ammoniaTransferPumpsCostTIC').value =(bioprocessOutputs.ammoniaTransferPumpsCostTIC).toFixed(2);
      document.getElementById('acidTransferPumpsCost').value = (bioprocessOutputs.acidTransferPumpsCost).toFixed(2);
      document.getElementById('acidTransferPumpsCostTIC').value =(bioprocessOutputs.acidTransferPumpsCostTIC).toFixed(2);
      document.getElementById('additionPiping').value = (bioprocessOutputs.additionPiping).toFixed(2);
      document.getElementById('additionsEquip').value =(bioprocessOutputs.additionsEquip).toFixed(2);
      document.getElementById('additionsTIC').value = (bioprocessOutputs.additionsTIC).toFixed(2);
      document.getElementById('agitatedMediaPrepTankCost').value =(bioprocessOutputs.agitatedMediaPrepTankCost).toFixed(2);
      document.getElementById('agitatedMediaPrepTankTIC').value = (bioprocessOutputs.agitatedMediaPrepTankTIC).toFixed(2);
      document.getElementById('mediaTransferPumpsCost').value =(bioprocessOutputs.mediaTransferPumpsCost).toFixed(2);
      document.getElementById('mediaTransferPumpsCostTIC').value = (bioprocessOutputs.mediaTransferPumpsCostTIC).toFixed(2);
      document.getElementById('MediaHeatExchanger').value =(bioprocessOutputs.MediaHeatExchanger).toFixed(2);
      document.getElementById('MediaHeatExchangerTIC').value =(bioprocessOutputs.MediaHeatExchangerTIC).toFixed(2);
      document.getElementById('MediaWaterHeater').value =(bioprocessOutputs.MediaWaterHeater).toFixed(2);
      document.getElementById('MediaWaterHeaterTIC').value =(bioprocessOutputs.MediaWaterHeaterTIC).toFixed(2);
      document.getElementById('mediaPiping').value =(bioprocessOutputs.MediaHeatExchanger).toFixed(2);
      document.getElementById('DryChemicalAdditionSkid').value =(bioprocessOutputs.DryChemicalAdditionSkid).toFixed(2);
      document.getElementById('DryChemicalAdditionSkidTIC').value =(bioprocessOutputs.DryChemicalAdditionSkidTIC).toFixed(2);
      document.getElementById('mediaPrepEquip').value =(bioprocessOutputs.mediaPrepEquip).toFixed(2);
      document.getElementById('mediaPrepTIC').value =(bioprocessOutputs.mediaPrepTIC).toFixed(2);
      document.getElementById('CIPTankCost').value =(bioprocessOutputs.CIPTankCost).toFixed(2);
      document.getElementById('CIPTankTIC').value =(bioprocessOutputs.CIPTankTIC).toFixed(2);
      document.getElementById('CIPTransferPumpsCost').value =(bioprocessOutputs.CIPTransferPumpsCost).toFixed(2);
      document.getElementById('CIPTransferPumpsCostTIC').value =(bioprocessOutputs.CIPTransferPumpsCostTIC).toFixed(2);
      document.getElementById('CIPFilterCost').value =(bioprocessOutputs.CIPFilterCost).toFixed(2);
      document.getElementById('CIPFilterCostTIC').value =(bioprocessOutputs.CIPFilterCostTIC).toFixed(2)
      document.getElementById('CIPHeaterCost').value =(bioprocessOutputs.CIPHeaterCost).toFixed(2);
      document.getElementById('CIPHeaterCostTIC').value =(bioprocessOutputs.CIPHeaterCostTIC).toFixed(2);
      document.getElementById('CIPpipingTIC').value =(bioprocessOutputs.CIPpipingTIC).toFixed(2);
      document.getElementById('CIPEquip').value =(bioprocessOutputs.CIPEquip).toFixed(2);
      document.getElementById('CIPTIC').value =(bioprocessOutputs.CIPTIC).toFixed(2);
      document.getElementById('seedEquipment').value =(bioprocessOutputs.seedEquipment).toFixed(2);
      document.getElementById('seedEquipmentTIC').value =(bioprocessOutputs.seedEquipmentTIC).toFixed(2);
      document.getElementById('CentrifugeCost').value =(bioprocessOutputs.CentrifugeCost).toFixed(2);
      document.getElementById('CentrifugeTIC').value =(bioprocessOutputs.CentrifugeTIC).toFixed(2);
      document.getElementById('Centrifugepiping').value =(bioprocessOutputs.Centrifugepiping).toFixed(2);
      document.getElementById('CentrifugeEquip').value =(bioprocessOutputs.CentrifugeEquip).toFixed(2);
      document.getElementById('CentrifugeEquipTIC').value =(bioprocessOutputs.CentrifugeEquipTIC).toFixed(2);
      document.getElementById('brothStorageTankCost').value =(bioprocessOutputs.brothStorageTankCost).toFixed(2);
      document.getElementById('brothStorageTankTIC').value =(bioprocessOutputs.brothStorageTankTIC).toFixed(2);
      document.getElementById('brothStorageTransferPumpCost').value =(bioprocessOutputs.brothStorageTransferPumpCost).toFixed(2);
      document.getElementById('brothStorageTransferPumpTIC').value =(bioprocessOutputs.brothStorageTransferPumpTIC).toFixed(2);
      document.getElementById('brothStoragePiping').value =(bioprocessOutputs.brothStoragePiping).toFixed(2);
      document.getElementById('brothStorageEquip').value =(bioprocessOutputs.brothStorageEquip).toFixed(2);
      document.getElementById('brothStorageTIC').value =(bioprocessOutputs.brothStorageTIC).toFixed(2);
      document.getElementById('HeatTreatmentpackage').value =(bioprocessOutputs.HeatTreatmentpackage).toFixed(2);
      document.getElementById('HeatTreatmentpackageTIC').value =(bioprocessOutputs.HeatTreatmentpackageTIC).toFixed(2);
      document.getElementById('PrimaryCellRemovalEquip').value =(bioprocessOutputs.PrimaryCellRemovalEquip).toFixed(2);
      document.getElementById('PrimaryCellRemovalTIC').value =(bioprocessOutputs.PrimaryCellRemovalTIC).toFixed(2);
      document.getElementById('coolingTowerEquip').value =(bioprocessOutputs.coolingTowerEquip).toFixed(2);
      document.getElementById('coolingTowerTIC').value =(bioprocessOutputs.coolingTowerTIC).toFixed(2);
      document.getElementById('coolingTowerPumps').value =(bioprocessOutputs.coolingTowerPumps).toFixed(2);
      document.getElementById('coolingTowerPumpsTIC').value =(bioprocessOutputs.coolingTowerPumpsTIC).toFixed(2);
      document.getElementById('coolingTowerPiping').value =(bioprocessOutputs.coolingTowerPiping).toFixed(2);
      document.getElementById('coolingEquip').value =(bioprocessOutputs.coolingEquip).toFixed(2);
      document.getElementById('coolingTIC').value =(bioprocessOutputs.coolingTIC).toFixed(2);
      document.getElementById('BoilerPackageCosts').value =(bioprocessOutputs.BoilerPackageCosts).toFixed(2);
      document.getElementById('BoilerPackageTIC').value =(bioprocessOutputs.BoilerPackageTIC).toFixed(2);
      document.getElementById('AirDryer').value =(bioprocessOutputs.AirDryer).toFixed(2);
      document.getElementById('AirDryingTIC').value =(bioprocessOutputs.AirDryingTIC).toFixed(2);
      document.getElementById('AirReceiver').value =(bioprocessOutputs.AirReceiver).toFixed(2);
      document.getElementById('AirReceiverTIC').value =(bioprocessOutputs.AirReceiverTIC).toFixed(2);
      document.getElementById('AirPiping').value =(bioprocessOutputs.AirPiping).toFixed(2);
      document.getElementById('AirHandlingEquip').value =(bioprocessOutputs.AirHandlingEquip).toFixed(2);
      document.getElementById('AirHandlingTIC').value =(bioprocessOutputs.AirHandlingTIC).toFixed(2);
      document.getElementById('MunicpalWaterTank').value =(bioprocessOutputs.MunicpalWaterTank).toFixed(2);
      document.getElementById('MunicpalWaterTankTIC').value =(bioprocessOutputs.MunicpalWaterTankTIC).toFixed(2);
      document.getElementById('PotableWaterTank').value =(bioprocessOutputs.PotableWaterTank).toFixed(2);
      document.getElementById('PotableWaterTankTIC').value =(bioprocessOutputs.PotableWaterTankTIC).toFixed(2);
      document.getElementById('SoftenerTank').value =(bioprocessOutputs.SoftenerTank).toFixed(2);
      document.getElementById('SoftenerTankTIC').value =(bioprocessOutputs.SoftenerTankTIC).toFixed(2);
      document.getElementById('BrineTank').value =(bioprocessOutputs.BrineTank).toFixed(2);
      document.getElementById('BrineTankTIC').value =(bioprocessOutputs.BrineTankTIC).toFixed(2);
      document.getElementById('PotableWaterCooler').value =(bioprocessOutputs.PotableWaterCooler).toFixed(2);
      document.getElementById('PotableWaterCoolerTIC').value =(bioprocessOutputs.PotableWaterCoolerTIC).toFixed(2);
      document.getElementById('MunipalWaterPump').value =(bioprocessOutputs.MunipalWaterPump).toFixed(2);
      document.getElementById('MunipalWaterPumpTIC').value =(bioprocessOutputs.MunipalWaterPumpTIC).toFixed(2);
      document.getElementById('ROSystem').value =(bioprocessOutputs.ROSystem).toFixed(2);
      document.getElementById('ROSystemTIC').value =(bioprocessOutputs.ROSystemTIC).toFixed(2);
      document.getElementById('WaterPiping').value =(bioprocessOutputs.WaterPiping).toFixed(2);
      document.getElementById('WaterHandlingEquip').value =(bioprocessOutputs.WaterHandlingEquip).toFixed(2);
      document.getElementById('WaterHandlingTIC').value =(bioprocessOutputs.WaterHandlingTIC).toFixed(2);
      document.getElementById('WasteWaterTank').value =(bioprocessOutputs.WasteWaterTank).toFixed(2);
      document.getElementById('WasteWaterTankTIC').value =(bioprocessOutputs.WasteWaterTankTIC).toFixed(2);
      document.getElementById('WasteWaterHeatExchanger').value =(bioprocessOutputs.WasteWaterHeatExchanger).toFixed(2);
      document.getElementById('WasteWaterHeatExchangerTIC').value =(bioprocessOutputs.WasteWaterHeatExchangerTIC).toFixed(2);
      document.getElementById('WasteWaterHeater').value =(bioprocessOutputs.WasteWaterHeater).toFixed(2);
      document.getElementById('WasteWaterHeaterTIC').value =(bioprocessOutputs.WasteWaterHeaterTIC).toFixed(2);
      document.getElementById('WasteWaterHeaterPump').value =(bioprocessOutputs.WasteWaterHeaterPump).toFixed(2);
      document.getElementById('WasteWaterHeaterPumpTIC').value =(bioprocessOutputs.WasteWaterHeaterPumpTIC).toFixed(2);
      document.getElementById('WasteWaterPiping').value =(bioprocessOutputs.WasteWaterPiping).toFixed(2);
      document.getElementById('WasteWaterEquip').value =(bioprocessOutputs.WasteWaterEquip).toFixed(2);
      document.getElementById('WasteWaterTIC').value =(bioprocessOutputs.WasteWaterTIC).toFixed(2);
      document.getElementById('processUtilitiesEquip').value =(bioprocessOutputs.processUtilitiesEquip).toFixed(2);
      document.getElementById('processUtilitiesTIC').value =(bioprocessOutputs.processUtilitiesTIC).toFixed(2);
      document.getElementById('controlSystems').value =(bioprocessOutputs.controlSystems).toFixed(2);
      document.getElementById('fermtotalInstalledEquipmentCost').value =(bioprocessOutputs.fermtotalInstalledEquipmentCost).toFixed(2);
      document.getElementById('dspTIC').value =(bioprocessOutputs.dspTIC).toFixed(2);
      document.getElementById('totalInstalledEquipmentCost').value =(bioprocessOutputs.totalInstalledEquipmentCost).toFixed(2);
      document.getElementById('warehousing').value =(bioprocessOutputs.warehousing).toFixed(2);
      document.getElementById('administrativeBuildings').value =(bioprocessOutputs.administrativeBuildings).toFixed(2);
      document.getElementById('siteDevelopment').value =(bioprocessOutputs.siteDevelopment).toFixed(2);
      document.getElementById('totalDirectCost').value =(bioprocessOutputs.totalDirectCost).toFixed(2);
      document.getElementById('HomeOffice').value =(bioprocessOutputs.HomeOffice).toFixed(2);
      document.getElementById('prorateableExpenses').value =(bioprocessOutputs.prorateableExpenses).toFixed(2);
      document.getElementById('fieldExpenses').value =(bioprocessOutputs.fieldExpenses).toFixed(2);
      document.getElementById('projectContingency').value =(bioprocessOutputs.projectContingency).toFixed(2);
      document.getElementById('otherStartupCosts').value =(bioprocessOutputs.otherStartupCosts).toFixed(2);
      document.getElementById('totalIndirectCosts').value =(bioprocessOutputs.totalIndirectCosts).toFixed(2);
      document.getElementById('fixedCapitalInvestment').value =(bioprocessOutputs.fixedCapitalInvestment).toFixed(2);
      document.getElementById('workingCapital').value =(bioprocessOutputs.workingCapital).toFixed(2);
      document.getElementById('totaCapitalInvestment').value =(bioprocessOutputs.totaCapitalInvestment).toFixed(2);
      document.getElementById('bioprocessoutputsTIC').innerHTML = (bioprocessOutputs.totalInstalledEquipmentCost).toFixed(0);


}

function bioprocessopexcapex(Input){
//Inputs from User Input
// Set Up Input Array & Define Initial Baseline Inputs & Outputs.
// Input    0-productName,                1-productFormula      2-productMW,              3-theorYield,           4-productYieldCoefficientNH3,
//          5-productYieldCoefficientO2,  6-vesselSize,         7-sellingPrice,           8-margin,               9-paybackPeriod,
//          10-discountRate,              11-taxRate,           12-percentDebtFinanced,   13-DebtInterestRate,    14-LoanTerm,
//          15-plantCapacity,             16-annualUptime,      17-batchOnSpec,           18-glucoseCost,         19-ammoniaCost,
//          20-naturalGasCost,            21-electricityCost    22-CEPCI,                 23-aveVolumtericRate,   24-Titer,
//          25-Yield,                     26-turnaroundTime,    27-mediaCost              28-Temperature,         29-overallDSPYield,
//          30-dspPercentofOpex,          31-dspPercentofCapex ];


    theorYield = Input[3];
    productYieldCoefficientGlucose = theorYield;
    productYieldCoefficientNH3 = Input[4];
    productYieldCoefficientO2 = Input[5];
    vesselSize = Input[6];
    annualProductionVolumeKta = Input[15];
    annualUpTime = (Input[16]/100)*8760; // hrs per year
    fermentationOnSpecRate  = Input[17]/100;
    glucoseCost= Input[18]; //0.18;
    ammoniaCost = Input[19];
    NaturalGasCost = Input[20]; // $/MMBtu,  *2018 Average for  EIA.
    ElectricityCost = Input[21];  // Alternative 0.00013*CEPCI + 0.010*CostOfFuel;// $/KWh Assumes purchase (Ulrich & Vasudevan)
    CEPCI = Input[22]; // 2018 Chemical Engineering Plant Cost Index (Ulrich & Vasudevan)
    CostOfFuel =  NaturalGasCost/1.05505; // 2018 $/GJ (Ulrich & Vasudevan)
    averageVolumetricRate = Input[23];
    finalTiter  = Input[24];
    fractionOftheoreticalMaximalYield = Input[25]/100;
    turnAroundTime = Input[26];
    mediaCost = Input[27]/1000;
    fermentationTemperature = Input[28];
    dspYield = Input[29]/100;
    dspOPEXfraction = Input[30]/100;
    dspCAPEXfraction = Input[31]/100;
    NaOHCosts = 0.15; // $/kg, based on $150/tonne https://yosemite.epa.gov/sab/sabproduct.nsf/953CCBEB820F0470852577920076316D/$File/NaOH+Practicality+Study.pdf
    PeraceticAcidCosts = 5; //$/L for CIP % solution


   // Advanced Inputs
    AmmoniaSourceMW = 17.031;//(g/mole) for NH3
    MicrobeMW  =  95.37; // (g/mole) for E. coli
    FeedstockMW = 180.156; // (g/mole) for glucose
    biomassYieldCoefficientGlucose = (MicrobeMW)/(0.84*FeedstockMW); // based on ideal formula 0.84 Glucose + 1 NH3 + 1.212 O2 --> 1 E. coli(C3.85H6.69O1.78N)+ 3.212 H2O + 1.212 CO2
    biomassYieldCoefficientNH3 = (MicrobeMW)/(1*AmmoniaSourceMW); // based on ideal formula 0.84 Glucose + 1 NH3 + 1.212 O2 --> 1 E. coli(C3.85H6.69O1.78N)+ 3.212 H2O + 1.212 CO2
    biomassYieldCoefficientO2 = (MicrobeMW)/(1.212*32); // g biomass/g O2 based on ideal formula 0.84 Glucose + 1 NH3 + 1.212 O2 --> 1 E. coli(C3.85H6.69O1.78N)+ 3.212 H2O + 1.212 CO2
    byproductYieldCoefficientO2 = (FeedstockMW)/(6*32); // g glucose consumed /g O2 for byproduct, based on ideal formula 1 Glucose + 6  O2 --> 6 H2O + 6 CO2

    // Advanced variables which are kept as defaults in the analyses
    inoculationFraction = 0.01; // fraction of volume at final biomass concentration used to inoculate production fermenters
    workingVolumeRatio = 0.85; // (L working volume)/(L gross volume)
    BiomassYieldFraction = 0.80; // the actual biomass yield as a fraction of theoretical maximal biomass yield
    FermenterAspectRatio = 2.55; // from Humbird et al.


   // The following are Calculations based on the Fermentation Targets
    targetAnnualFermProduction = annualProductionVolumeKta*1000000/dspYield; // % (kg) accounts for DSP losses
    maxVesselWorkingVolume = workingVolumeRatio*vesselSize; // (Liters)
    maxProductPerVessel = finalTiter*maxVesselWorkingVolume/1000; // (kg or product per batch )
    totalFermentationTime = finalTiter/averageVolumetricRate;  // hours
    timeForOneBatch =  totalFermentationTime + turnAroundTime; // (hours)
    annualFermentationUpTime = (totalFermentationTime/(totalFermentationTime + turnAroundTime))*annualUpTime;  //hrs
    numberOfBatchesPerYearPerTank = Math.floor((annualFermentationUpTime/timeForOneBatch)*fermentationOnSpecRate);
    totalAnnualProductPerTank = numberOfBatchesPerYearPerTank*maxProductPerVessel; // (kg)
    numberOfTanks = Math.ceil(targetAnnualFermProduction/totalAnnualProductPerTank);
    mediaVolume = maxVesselWorkingVolume*numberOfBatchesPerYearPerTank*numberOfTanks ;// (Liters)
    fractionInProduction =  totalFermentationTime/timeForOneBatch;
    AnnualFermentationProduction = numberOfTanks*totalAnnualProductPerTank;
    plantCapacity = AnnualFermentationProduction*dspYield;
    totalAnnualFermWorkingVolume = numberOfTanks*maxVesselWorkingVolume*numberOfBatchesPerYearPerTank;

   // Bioreactor  based Calculations
    FermenterRadius = ((vesselSize/1000/3.14159265359)/(2*FermenterAspectRatio))**0.333333; // meters
    FermenterDiameter = 2*FermenterRadius ;// meters
    FermenterHeight = FermenterAspectRatio*FermenterDiameter; // meters
    maxWorkingFillHeight = (maxVesselWorkingVolume/1000/3.14159265359)/(FermenterRadius*FermenterRadius);// meters
    maxFermenterPressure = 1000*9.8066*maxWorkingFillHeight/100000 + 0.25 ; // bar (1 N/m2 =100,000 bar)

  // The following are Calculations based on the Fermentation Targets
    maxProductPerLcapacity = finalTiter*workingVolumeRatio; // (g of product per L of bioreactor capacity )
    totalFermentationTime = finalTiter/averageVolumetricRate;  // hours
    ProductBatchSugarPerLcapacity = (maxProductPerLcapacity/theorYield); // g glucose / L capacity assumes 100% of theoretical yield for glucose not going to biomass
    TotalBatchSugarPerLcapacity = ProductBatchSugarPerLcapacity/fractionOftheoreticalMaximalYield ; // Total sugar consumed assuming target yield losses

   // Biomass Based Calculations - Final Biomass levels are calculated from Titer, Rate and Yield Requirements
    MicrobeMW  =  95.37; // (g/mole) for E. coli
    ProductBatchSugar = (maxProductPerVessel/productYieldCoefficientGlucose); // assumes 100% of theoretical yield
    //console.log(ProductBatchSugar);
    TotalBatchSugar = ProductBatchSugar/(fractionOftheoreticalMaximalYield); // Total sugar consumed assuming biomass yield losses
    //console.log(TotalBatchSugar);
    MaxBiomassSugar =  TotalBatchSugar -  ProductBatchSugar;
    finalBiomassConcentration = ((biomassYieldCoefficientGlucose*MaxBiomassSugar)/maxVesselWorkingVolume)*1000 ;// gCDW/L Final Biomass Concentration
    specificRate = averageVolumetricRate/finalBiomassConcentration;
    startingBiomassConcentration  = finalBiomassConcentration*inoculationFraction ;// (gCDW/L)
    A = (finalBiomassConcentration - startingBiomassConcentration)/startingBiomassConcentration; // assumes logistic growth
    averageLogisticGrowthRate = -(Math.log(0.01/A))/totalFermentationTime; // (hr-1)
    overallFermYield = maxProductPerLcapacity/TotalBatchSugarPerLcapacity; //g/g

    // Growth Associated Product Calculations (Assumes Logistic Growth)
    productToCellRatio = finalTiter/(finalBiomassConcentration-startingBiomassConcentration); // (gram product / gram CDW)
    averageLogisiticProductionRate = productToCellRatio*averageLogisticGrowthRate; //(hr-1)
    var Biomass = [];
    var time = [];
    var productTiter = [];
    Biomass[0] = finalBiomassConcentration*inoculationFraction;
    time[0] = 0;
    productTiter[0] = 0;
    k = averageLogisticGrowthRate;
    for (i = 1; i < totalFermentationTime; i++){
        time[i] = i;
        Biomass[i] = finalBiomassConcentration / (1+A*Math.exp(-k*time[i]));
        productTiter[i]=productToCellRatio*Biomass[i];
   }

   // Water Requirements & Costs
    averageWaterDemandRate = ((mediaVolume/annualFermentationUpTime)/1000)/(3600); // %m3/sec
    waterCost = (0.0007 +0.00003*(Math.pow(averageWaterDemandRate,-0.6)))*CEPCI + 0.02*CostOfFuel; // $/m3
    annualWaterCosts = (mediaVolume/1000)*waterCost; // $

   // Feedstock Requirements & Costs
    cumulativeProductGlucose = ((finalTiter*totalAnnualFermWorkingVolume)/productYieldCoefficientGlucose)/1000 ; //kg glucose needed
    cumulativeBiomassGlucose = ((finalBiomassConcentration*totalAnnualFermWorkingVolume)/biomassYieldCoefficientGlucose)/1000 ;// kg glucose needed
    cumulativeBiomassLostGlucose = (cumulativeBiomassGlucose/BiomassYieldFraction) - cumulativeBiomassGlucose;// kg/year

        if (productYieldCoefficientNH3 != Infinity){
         cumulativeProductNH3 = ((finalTiter*totalAnnualFermWorkingVolume)/productYieldCoefficientNH3)/AmmoniaSourceMW/1000; // kg NH3 needed
        }else{
        cumulativeProductNH3 =0;
         }

    cumulativeBiomassNH3 = ((finalBiomassConcentration*totalAnnualFermWorkingVolume)/biomassYieldCoefficientNH3)/BiomassYieldFraction/1000; //  kg NH3 needed
    cumulativeByProductGlucose = (cumulativeProductGlucose/fractionOftheoreticalMaximalYield) - cumulativeProductGlucose; //kg/year
    cumulativeAnnualGlucose = cumulativeBiomassGlucose +  cumulativeProductGlucose + cumulativeByProductGlucose;// kg/year
    averageGlucoseConsumptionRate = cumulativeAnnualGlucose/annualFermentationUpTime; // kg/hr
    cumulativeAnnualNH3 = cumulativeBiomassNH3 + cumulativeProductNH3; // kg/year
    averageNH3ConsumptionRate = cumulativeAnnualNH3/annualFermentationUpTime ;// kg/hr
    annualCostOfGlucose = cumulativeAnnualGlucose*(glucoseCost*2.20462);  //year
    annualCostOfNH3 = cumulativeAnnualNH3*(ammoniaCost*2.20462); // $/year
    annualCostOfMedia = totalAnnualFermWorkingVolume*finalBiomassConcentration*mediaCost/1000; // $/year (media cost input is $/kg, need to divide by 1000 to conver to $/g)

    // Oxygen/Air Requirements & Costs

   // Cumulative O2/Air Need Needed
    cumulativeProductO2 = (((finalTiter*totalAnnualFermWorkingVolume)/productYieldCoefficientO2)/32)*1000; //mmoles O2 needed
    cumulativeBiomassO2 = (((finalBiomassConcentration*totalAnnualFermWorkingVolume)/biomassYieldCoefficientO2)/32/BiomassYieldFraction)*1000;// mmoles O2 needed for Biomass
    cumulativeByProductO2 = (((cumulativeByProductGlucose)/FeedstockMW)*1000)*6*1000;//mmoles O2 needed for biomass and product inefficiencies
    cumulativeO2 = cumulativeBiomassO2 + cumulativeProductO2 + cumulativeByProductO2;// mmoles O2 needed
    averageOTR = (cumulativeO2/annualFermentationUpTime/totalAnnualFermWorkingVolume);// average mmoles/L-hr O2 needed
    cumulativeAir = cumulativeO2/9.375/1000 ;// m3 of air needed, 9.375 mmoles O2 per liter of air
    averageAnnualAirflow = (cumulativeAir/(annualFermentationUpTime*3600))*1.333;// Average m3 of air needed per second (assumes 75% O2 consumption, Benz 2008)
    AnnualCostOfAirperM3 = (0.00005*(Math.pow(averageAnnualAirflow,-0.3))*Math.log(maxFermenterPressure)*CEPCI) + 0.0009*Math.log(maxFermenterPressure)*CostOfFuel;// $/m3 (Ulrich & Vasudevan)
    annualCostOfCompressedAir = AnnualCostOfAirperM3*cumulativeAir;// $/year

    // max OTR & Kla

    // Biomass OTR
    maxBiomassOTR = (((1/biomassYieldCoefficientO2)/BiomassYieldFraction)*(1000/32)*averageLogisticGrowthRate/4)*finalBiomassConcentration;  // (mmoles O2/ L-hr), assumes logistic growth per tank
    maxByProductOTR = (((1/byproductYieldCoefficientO2)/(1-BiomassYieldFraction))*(1000/32)*averageLogisticGrowthRate/4)*finalBiomassConcentration;  // (mmoles O2/ L-hr), assumes logistic growth per tank

     // If product biosynthesis requires Oxygen
    if (productYieldCoefficientO2 != Infinity){
        maxProductOTR = ((productYieldCoefficientO2*averageLogisiticProductionRate)/4)*finalTiter; // (mmoles O2/ L-hr), assumes growth associated production per tank
    }else{
        maxProductOTR =0;
    }
    maxOTR = maxProductOTR +maxByProductOTR+ maxBiomassOTR; // mmoles/L-hr per tank
    maxOxygenFlowRate = maxOTR*maxVesselWorkingVolume; // mmoles/hr per tank
    maxAirFlowRate = maxOxygenFlowRate/9.375/0.5/1000/3600; // (standard m3 air per second) per tank, 9.375 mmoles O2 per liter of air, divided by fraction which is taken up by liquid
    maxKla = (maxOTR/0.15)/3600; //(sec-1) assumes air as sole oxygen source, assumes logistic growth per tank and maximal driving force at 75% consumption (0.2 - 0.05mmoles O2/L)

    // Mass transfer requirements (Stirred Tank) assumes $2/kg of O2 delivered, 0.233 kg O2 per kg Air
    cumulativeAirkg = cumulativeAir*1.225; //
    annualMassTransferPowerNeed = 1.8*0.233*cumulativeAirkg; //  KWh , assumes  O2 delivered, 0.233 kg O2 per kg Air % Watts,  Humbird et al.
    annualCost0fMassTransfer = annualMassTransferPowerNeed*ElectricityCost; //

    // Cooling Calculations(Cooling Tower Water)
    maxCoolingRate = 0.460*maxOTR; // kJ/hr per tank uses 460kJ/mole O2 consumed (Doran), equal to 110kcal/mole ( Humbird)
    cumulativeCoolingDemand = 0.460*cumulativeO2; // kJ
    cumulativeCoolingRateDemand = 0.0000789848*cumulativeCoolingDemand/annualFermentationUpTime; // needed cooling capacity ton

   // Cooling Tower Water
    coolingWaterTemperature = 29.4 ; // degrees Celsius
    cumulativeCoolingWaterNeeded =  cumulativeCoolingDemand/(4.184*(fermentationTemperature-5-coolingWaterTemperature))/1000/1000; // (m3 of cooling water), assumes 37C fermentation, 32C outlet cooling water
    averageCoolingWaterFlowRate = (cumulativeCoolingWaterNeeded/annualFermentationUpTime)/3600; // m3/sec
    annualCostOfCoolingWater = cumulativeCoolingWaterNeeded*((0.0001+(0.00003/averageCoolingWaterFlowRate))*CEPCI + 0.003*CostOfFuel);// $/year (Ulrich & Vasudevan)

    // Sterilization Calculations
    mediaSterilizationTemperature = 120; // (degrees Celsius)
    ambientTemperature = 20; // (degrees Celsius)
    sterilizationEfficiency = 0.2; // Watts consumed per Watt used to sterilize
    mediaSterilizationEnergyConsumption = 4.184*mediaVolume*sterilizationEfficiency*(mediaSterilizationTemperature-ambientTemperature); // (kJ/year)
    annualCostOfSterilization = (mediaSterilizationEnergyConsumption/1055056)*NaturalGasCost; // $/year

    //CIP Costs  // https://www.chemengonline.com/large-scale-fermentation-systems-hygienic-design-principles/
    // Assumes NAOH at 2wt% treatment after each batch
    annualNaOHCosts = (numberOfBatchesPerYearPerTank*numberOfTanks*vesselSize)*.02*NaOHCosts;
    // Assumes Peracetic Acid used at final concentratio of 200ppm  or 0.02%
    annualPeraceticCosts = (numberOfBatchesPerYearPerTank*numberOfTanks*vesselSize)*.002*PeraceticAcidCosts; //Assumes PA at 15-20%
    annualCIPCosts = annualNaOHCosts+annualPeraceticCosts;

    // Primary Cell Removal Calculations (Centrifugation)
        // Sigma = Q/2uo e coli uo=6.81X10-9 m/s
    CentrifugeFlowRate = 10000; //L/hour = 10m3/hr = 0.0028 m3/s) doable with disc stacked centrifuge
    annualCentrifugeVolume = totalAnnualFermWorkingVolume; // Liters
    hoursOfCentrifugationRequired = annualCentrifugeVolume/10000;
    numberOfCentrigfuges = Math.ceil(hoursOfCentrifugationRequired/annualUpTime);
    actualAnnualCentrifugeUptime = annualCentrifugeVolume/(numberOfCentrigfuges*CentrifugeFlowRate)
    powerConsumptionPerCentrigfuge = 50 ;// kW  include 40 kW for centrifuge and 10kW for pumps
    annualCostOfCentrifugation = numberOfCentrigfuges*powerConsumptionPerCentrigfuge*actualAnnualCentrifugeUptime*ElectricityCost;// $/year

    // Biomass Heat Kill
    heatKillVolume = mediaVolume;//(Liters)
    heatKillTemperature = 60 ; // (degrees Celsius) assumes E. coli process
    ambientTemperature = 20; // (degrees Celsius)
    heatKillEfficiency = 0.2; // Watts consumed per Watt used to sterilize
    heatKillEnergyConsumption = 4.184*heatKillVolume*heatKillEfficiency*(heatKillTemperature-ambientTemperature); // (kJ/year)
    annualCostOfHeatKill =  (heatKillEnergyConsumption/1055056)*NaturalGasCost; //  $/year

    // Biomass Disposal Fees
    totalAnnualBiomass = finalBiomassConcentration*totalAnnualFermWorkingVolume/1000; // kg biomass per year
    CostofBiomassDisposal = 0.0003*totalAnnualBiomass*CEPCI + 0*CostOfFuel; // $/year (Ulrich & Vasudevan)


// Capex Estimations
// Major Equipment
// For all major equipment
// purchase cost  = (# of units)* Quoted Cost *(Actual Size / Quoted Size)^ Scaling Factor
// TIC = (Inflation Factor)(purchase cost)(Installation Factor)
// 2009-2020 Producers inflation = 1.17
// 2013-2020 Producers inflation = 1.00
// 2014-2020 Producers inflation = 1.03
// 2010-2020 Producers inflation = 1.12
// 2017-2020 Producers inflation = 1.06


         if (vesselSize == 1000000){      // %% NREL 2013, quote year 2010 , inflation - 1.12
             fermenterUnitCost = (176000)*(Math.pow((1000000/76000),0.7));
            }else if (vesselSize = 500000){
             fermenterUnitCost = (176000)*(Math.pow((500000/76000),0.7));
            }else if (vesselSize = 200000){
             fermenterUnitCost = (176000)*(Math.pow((200000/76000),0.7));
          }


// Main Fermenter Area including Air Handling
        fermenterCost = numberOfTanks*(fermenterUnitCost); // NREL 2013 , Quote year 2010
        fermenterTIC = 1.12*fermenterCost*2;
        fermenterAgitatorCost = numberOfTanks*36000*(Math.pow((vesselSize/75708),0.5)); // NREL 2013 , Quote year 2013
        fermenterAgitatorTIC = 1.00*fermenterAgitatorCost*1.5;
        maxBlowerFlowRate = 23.6; //Maximum air flow (m3/s) from a single blower (Seider, Seader, and Lewin 2016)
        numberOfBlowers = Math.ceil(numberOfTanks*maxAirFlowRate*(totalFermentationTime/(totalFermentationTime+turnAroundTime))/maxBlowerFlowRate);// Number of blowers required
        flowRatePerBlower = numberOfTanks*maxAirFlowRate*(totalFermentationTime/(totalFermentationTime+turnAroundTime))/numberOfBlowers;
        airBlowerCost = numberOfBlowers*29000*(Math.pow((flowRatePerBlower/43.333),0.6)); // NREL 2013 , Quote year 2013, based on $29k for each 43.3m3/s blower
        airBlowerTIC = 1.00*airBlowerCost*1.6;
        TransferPumpsCost = 2*numberOfTanks*3933*(Math.pow((vesselSize/950000),0.8)); //NREL 2009
        TransferPumpsTIC = 1.17*TransferPumpsCost*2.3;
        fermentationCoolersCost = 0 ; // included in fermenter cost
        fermentationCoolersTIC = 0 ; // included in fermenter cost
        mainFermPiping = 0.045*(fermenterTIC+fermenterAgitatorTIC+airBlowerTIC+TransferPumpsTIC);
        mainFermTIC = (mainFermPiping+fermenterTIC+fermenterAgitatorTIC+airBlowerTIC+TransferPumpsTIC);
        mainFermEquip = fermenterCost + fermenterAgitatorCost + airBlowerCost +TransferPumpsCost+ fermentationCoolersCost;
        //console.log(numberOfTanks);
        //console.log(fermenterUnitCost);
        //console.log(mainFermEquip);
       // console.log(fermenterUnitCost);
       // console.log(fermenterAgitatorCost);
       // console.log(airBlowerCost);
       // console.log(TransferPumpsCost);

// Sugar Storage
        glucoseStorageTankCost = 70000*(Math.pow(((averageGlucoseConsumptionRate*12)/264978),0.7)); // NREL 2013 , Quote year 2009, holds 12 hrs of feed.
        glucoseStorageTankTIC = 1.17*glucoseStorageTankCost*2.6; //
        glucoseStorageTransferPumpsCost = numberOfTanks*3933*(Math.pow(((averageGlucoseConsumptionRate*12)/950000),0.8)); //NREL 2009
        glucoseStorageTransferPumpsTIC= 1.17*glucoseStorageTransferPumpsCost*2.3;
        glucoseStoragepiping = 0.045*(glucoseStorageTankTIC+glucoseStorageTransferPumpsTIC);
        glucoseStorageTIC = (glucoseStoragepiping+glucoseStorageTankTIC+glucoseStorageTransferPumpsTIC);
        glucoseStorageEquip = glucoseStorageTankCost+glucoseStorageTransferPumpsCost;
       // console.log(sugarStorageEquip);

// Titrant Prep & Storage
        ammoniaStorageTankCost = 98000*(Math.pow(((averageNH3ConsumptionRate*12)/105991),0.7)); // NREL 2013 , Quote year 2010, holds 12 hrs of feed.
        ammoniaStorageTankTIC = 1.13*ammoniaStorageTankCost*2;//
        acidStorageTankCost = ammoniaStorageTankCost;
        acidStorageTankTIC = 1.13*acidStorageTankCost*2;//
        ammoniaTransferPumpsCost = numberOfTanks*3933*(Math.pow(((averageNH3ConsumptionRate*12)/950000),0.8)); //NREL 2009
        ammoniaTransferPumpsCostTIC = 1.17*ammoniaTransferPumpsCost*2.3;
        acidTransferPumpsCost  = ammoniaTransferPumpsCost;
        acidTransferPumpsCostTIC  = 1.17*ammoniaTransferPumpsCost*2.3;
        additionPiping = 0.045*(ammoniaStorageTankTIC+acidStorageTankTIC +ammoniaTransferPumpsCostTIC+acidTransferPumpsCostTIC);
        additionsTIC = (additionPiping+ammoniaStorageTankTIC+acidStorageTankTIC +ammoniaTransferPumpsCostTIC+acidTransferPumpsCostTIC);
        additionsEquip =  ammoniaStorageTankCost+acidStorageTankCost +ammoniaTransferPumpsCost+ acidTransferPumpsCost ;
        //console.log(additionsEquip);

// Agitated Media Prep & Storage
        agitatedMediaPrepTankCost = 91200*(Math.pow((vesselSize/264978),0.7)); // NREL 2013 , Quote year 2009
        agitatedMediaPrepTankTIC = 1.17*agitatedMediaPrepTankCost*2.6;//
        mediaTransferPumpsCost = (numberOfTanks+1)*(3933*(Math.pow((vesselSize/950000),0.8))); //NREL 2009 + 1 for RO water addition
        mediaTransferPumpsCostTIC  = 1.17*mediaTransferPumpsCost*2.3;
        MediaHeatExchanger =25000;
        MediaWaterHeater = 25000;
        MediaHeatExchangerTIC = MediaHeatExchanger *2;
        MediaWaterHeaterTIC  = MediaWaterHeater*2;

// Dry Chemicals
       DryChemicalAddition  = 100000;
       DryChemicalAdditionTIC = 2*DryChemicalAddition; // 2020 Estimate Lynch

        mediaPiping = 0.045*(agitatedMediaPrepTankTIC+mediaTransferPumpsCostTIC+MediaWaterHeaterTIC);
        mediaPrepTIC = (mediaPiping+agitatedMediaPrepTankTIC+mediaTransferPumpsCostTIC+MediaWaterHeaterTIC+DryChemicalAdditionTIC );
        mediaPrepEquip = agitatedMediaPrepTankCost +mediaTransferPumpsCost +MediaHeatExchanger +MediaWaterHeater +DryChemicalAddition;


// CIP
        CIPTankCost = 3*(98000*(Math.pow((vesselSize/100)/105991),0.7)); // NREL 2013 , Quote year 2010, holds 1/100 volume of concentrated
        CIPTankTIC = 1.13*CIPTankCost*2;//
        CIPTransferPumpsCost = numberOfTanks*(3933*(Math.pow((vesselSize/100)/950000),0.8)); //NREL 2009
        CIPTransferPumpsCostTIC  = 1.17*CIPTransferPumpsCost*2.3;
        CIPFilterCost = 35000; // 2020 Estimate Lynch
        CIPFilterCostTIC = CIPFilterCost *1.5; // 2020 Estimate Lynch
        CIPHeaterCost = 30000;
        CIPHeaterCostTIC = CIPHeaterCost*2; // 2020 Estimate Lynch
        CIPpipingTIC = 0.045*(CIPTankTIC +CIPTransferPumpsCostTIC+CIPTransferPumpsCostTIC+CIPTransferPumpsCostTIC);
        CIPTIC = (CIPpipingTIC+CIPTankTIC +CIPTransferPumpsCostTIC+CIPTransferPumpsCostTIC+CIPTransferPumpsCostTIC);
        CIPEquip = CIPTankCost+CIPTransferPumpsCost + CIPFilterCost +CIPHeaterCost;


        MainFermAreaEquip = mainFermEquip+glucoseStorageEquip+additionsEquip+mediaPrepEquip+CIPEquip ;
        MainFermAreaTIC = mainFermTIC+glucoseStorageTIC+additionsTIC+mediaPrepTIC+ CIPTIC;
        console.log(MainFermAreaEquip);
        console.log(MainFermAreaTIC);

// Area 100: Seed Fermenter Area
        seedEquipment  = 0.27*MainFermAreaEquip;
        seedEquipmentTIC = 0.27*MainFermAreaTIC;  // Assume 0.27 * production fermentation equipment cost per NREL_2013

// Area 400 : Primary Cell Removal Capex

// Centrifugation

        // Sigma = Q/2uo e coli uo=6.81X10-9 m/s
        CentrifugeFlowRate2 = 0.0028; // m3/sec or 10000L/hour ) doable with disc stacked centrifuge
        Sigma = 205580; // needed sigama in m2, at 10000L/hr flow rate
        // cost of 200 X 1000 m2 Cenrifuge is $325,000, 1998 https://www.cheric.org/files/education/cyberlecture/d200301/d200301-1801.pdf
        CentrifugeCost = numberOfCentrigfuges*325000*1.71;// 1.61 to correct for time
        CentrifugeTIC = CentrifugeCost*1.8;//
        Centrifugepiping = 0.045*CentrifugeTIC;
        CentrifugeEquip = CentrifugeCost + Centrifugepiping;
        CentrifugeEquipTIC = CentrifugeTIC + Centrifugepiping;

// Broth Storage
        brothStorageTankCost = (1317000*(Math.pow((vesselSize*numberOfTanks*0.5)/4542000),0.7)); // NREL 2013 , Quote year 2011, sized to 1/2 of fermentation capacity
        brothStorageTankTIC = 1.0*brothStorageTankCost*1.8;
        brothStorageTransferPumpCost= (3933*(Math.pow((vesselSize*numberOfTanks*0.5)/950000),0.8)); //NREL 2009
        brothStorageTransferPumpTIC= 1.17*brothStorageTransferPumpCost*2.3;
        brothStoragePiping = 0.045*(brothStorageTankTIC +brothStorageTransferPumpTIC);
        brothStorageEquip = brothStorageTankCost+ brothStorageTransferPumpCost+brothStoragePiping;
        brothStorageTIC = (brothStoragePiping+brothStorageTankTIC +brothStorageTransferPumpTIC);

// Cell heat Kill
        HeatTreatmentpackageTIC = 2*250000; // 2020 Lynch Estimate, includes Piping
        PrimaryCellRemovalEquip = CentrifugeEquip+ brothStorageEquip+HeatTreatmentpackageTIC/2;
        PrimaryCellRemovalTIC = (CentrifugeTIC + brothStorageTIC + HeatTreatmentpackageTIC);

// Area 0: Utilities

// Process Utilities
        // Cooling Water
           coolingTowerEquip = 250*cumulativeCoolingRateDemand; //$/ton
           coolingTowerTIC = 2*coolingTowerEquip; //$/ton
           coolingTowerPumps = coolingTowerEquip;
           coolingTowerPumpsTIC = 2.3*coolingTowerPumps;
           coolingTowerPiping = 0.045*(coolingTowerTIC+coolingTowerPumpsTIC);
           coolingEquip = coolingTowerEquip +coolingTowerPumps;
           coolingTIC = (coolingTowerPiping+coolingTowerTIC+coolingTowerPumpsTIC);

        // Boiler Package
            BoilerPackageCosts = 1000000;
            BoilerPackageTIC = 2*BoilerPackageCosts;

        // AirHandling
            AirDryer = 100000;
            AirDryingTIC = AirDryer*2;
            AirReceiver = 100000;
            AirReceiverTIC = AirReceiver*2;
            AirPiping=0.045*(AirDryingTIC+AirReceiverTIC);
            AirHandlingEquip = AirDryer + AirReceiver;
            AirHandlingTIC =(AirPiping+AirDryingTIC+AirReceiverTIC);

        // Water Handling & Purification
            MunicpalWaterTank =50000;
            MunicpalWaterTankTIC = MunicpalWaterTank*2;
            PotableWaterTank =50000;
            PotableWaterTankTIC  = PotableWaterTank*2;
            SoftenerTank = 20000;
            SoftenerTankTIC  = SoftenerTank*2;
            BrineTank = 20000;
            BrineTankTIC  = BrineTank*2;
            PotableWaterCooler = 30000;
            PotableWaterCoolerTIC  = PotableWaterCooler*2;
            MunipalWaterPump = 15000;
            MunipalWaterPumpTIC  = MunipalWaterPump*2.3;
            ROSystem = 20000;
            ROSystemTIC = ROSystem*2;
            WaterPiping  = 0.045*(MunicpalWaterTankTIC+PotableWaterTankTIC+SoftenerTankTIC+BrineTankTIC+ PotableWaterCoolerTIC+MunipalWaterPumpTIC+ROSystemTIC);
            WaterHandlingEquip = (MunicpalWaterTank+PotableWaterTank+SoftenerTank+BrineTank+ PotableWaterCooler+MunipalWaterPump+ROSystem);
            WaterHandlingTIC= (WaterPiping+MunicpalWaterTankTIC+PotableWaterTankTIC+SoftenerTankTIC+BrineTankTIC+ PotableWaterCoolerTIC+MunipalWaterPumpTIC+ROSystemTIC);

       // Waste Disposal
            WasteWaterTank = 100000;
            WasteWaterTankTIC = 2*WasteWaterTank;
            WasteWaterHeatExchanger= 25000;
            WasteWaterHeatExchangerTIC = WasteWaterHeatExchanger*2;
            WasteWaterHeater = 25000;
            WasteWaterHeaterTIC  = WasteWaterHeater*2;
            WasteWaterHeaterPump =  8000;
            WasteWaterHeaterPumpTIC = WasteWaterHeaterPump*2.3;
            WasteWaterPiping  = 0.045*(WasteWaterTankTIC+WasteWaterHeatExchangerTIC+WasteWaterHeaterTIC+WasteWaterHeaterPumpTIC);
            WasteWaterEquip = (WasteWaterPiping +WasteWaterTank+WasteWaterHeatExchanger+WasteWaterHeater+WasteWaterHeaterPump);
            WasteWaterTIC = (WasteWaterPiping +WasteWaterTankTIC+WasteWaterHeatExchangerTIC+WasteWaterHeaterTIC+WasteWaterHeaterPumpTIC);

       // Utilities Total
            processUtilitiesEquip = (coolingEquip + BoilerPackageCosts + AirHandlingEquip + WaterHandlingEquip + WasteWaterEquip);
            processUtilitiesTIC  = (coolingTIC + BoilerPackageTIC + AirHandlingTIC + WaterHandlingTIC + WasteWaterTIC);



// Area 600 : Instruments & Control
        controlSystems =0.10*(MainFermAreaTIC + seedEquipmentTIC+ PrimaryCellRemovalTIC+ processUtilitiesTIC);
        fermtotalInstalledEquipmentCost = MainFermAreaTIC + seedEquipmentTIC+ PrimaryCellRemovalTIC+ processUtilitiesTIC +controlSystems ;

// DSP
        totalInstalledEquipmentCost =  fermtotalInstalledEquipmentCost/(1-dspCAPEXfraction);
        dspTIC = dspCAPEXfraction*totalInstalledEquipmentCost;
        console.log(totalInstalledEquipmentCost);

//  Buildings: administration, Warehousing etc
        warehousing = 0.04*totalInstalledEquipmentCost;
        administrativeBuildings = 0.05*totalInstalledEquipmentCost; //Office
        siteDevelopment = 0.09*totalInstalledEquipmentCost;

// Total Direct Costs
        totalDirectCost =siteDevelopment+warehousing+administrativeBuildings +totalInstalledEquipmentCost;

// Indirect Costs

        HomeOffice = 0.2*totalDirectCost; // Engineering &  https://www.sciencedirect.com/topics/engineering/minimum-ethanol-selling-price
        prorateableExpenses = 0.1*totalDirectCost;
        fieldExpenses  = 0.1*totalDirectCost;
        projectContingency = 0.2*totalDirectCost;
        otherStartupCosts = 0.1*totalDirectCost; // permitting etc.
        totalIndirectCosts = otherStartupCosts + projectContingency +HomeOffice +fieldExpenses  + prorateableExpenses ;
        fixedCapitalInvestment = totalDirectCost + totalIndirectCosts;
        workingCapital = 0.05*fixedCapitalInvestment;
        realEstate= 0.06*fixedCapitalInvestment;
        totaCapitalInvestment  = fixedCapitalInvestment + workingCapital + realEstate;

   // Fermentation Opex Cost Summary
    annualUtilityCosts = annualCostOfHeatKill + annualCostOfSterilization +  annualCostOfCoolingWater + annualCostOfCompressedAir + annualCost0fMassTransfer + CostofBiomassDisposal + annualCostOfCentrifugation; //
    annualRawMaterialCosts = annualCostOfMedia  + annualCostOfNH3 + annualCostOfGlucose + annualWaterCosts + annualCIPCosts; //
    annualLaborCosts = 1.122*203923*numberOfTanks; //  (includes overhead labor uses cost per tank (NREL2013))x inflation factor);//
    annualAdditionalFixedCosts = 1.122*0.037*1.175*(totalDirectCost); // (per NREL2013 x inflation factor); //
    annualFixedCosts = annualAdditionalFixedCosts + annualLaborCosts; //
    annualfermOpex = annualUtilityCosts + annualRawMaterialCosts +annualFixedCosts;//

    //Total Opex
    annualOpex  =  annualfermOpex/(1-dspOPEXfraction);

    //per kg outputs
    opexperkg =  annualOpex/plantCapacity;//
    capexperkg = totaCapitalInvestment/plantCapacity;//
    annualLaborCostsperkg  = annualLaborCosts/plantCapacity;//
    annualAdditionalFixedCostsperkg = annualAdditionalFixedCosts/plantCapacity;//
    annualfermOpexperkg = annualfermOpex/plantCapacity;//
    annualFixedCostsperkg = annualFixedCosts/plantCapacity;//
    annualRawMaterialCostsperkg = annualRawMaterialCosts/plantCapacity;//
    annualUtilityCostsperkg = annualUtilityCosts/plantCapacity;//

    costOfGlucoseperkg = annualCostOfGlucose/plantCapacity;
    costOfAmmoniaperkg = annualCostOfNH3/plantCapacity;
    costOfMediaperkg = (annualCostOfMedia+ annualWaterCosts)/plantCapacity;
    costOfCIP = annualCIPCosts/plantCapacity
    costOfAerationperkg = (annualCost0fMassTransfer + annualCostOfCompressedAir)/plantCapacity;
    costOfCoolingperkg = annualCostOfCoolingWater/plantCapacity;
    costOfBiomassDisposalperkg = (CostofBiomassDisposal+annualCostOfHeatKill)/plantCapacity;
    costOfSterilizationperkg = annualCostOfSterilization/plantCapacity;
    costOfLaborperkg = annualLaborCosts/plantCapacity;
    otherFixedCostsperkg =  annualAdditionalFixedCosts/plantCapacity;
    dspOPEXperkg = dspOPEXfraction*opexperkg;


    // Return outputs

    var bioprocessOutputs = new Object();

// FermOutputs

    bioprocessOutputs.time = time;
    bioprocessOutputs.biomass = Biomass;
    bioprocessOutputs.productTiter = productTiter;
    bioprocessOutputs.finalBiomass = finalBiomassConcentration;
    bioprocessOutputs.specificRate = specificRate;
    bioprocessOutputs.overallFermYield = overallFermYield;
    bioprocessOutputs.fermTime = totalFermentationTime;
    bioprocessOutputs.maxOTR = maxOTR;
    bioprocessOutputs.maxKla = maxKla;
    bioprocessOutputs.maxCoolingRate = maxCoolingRate;

// OPEX Outputs

    bioprocessOutputs.annualOpex = annualOpex;
    bioprocessOutputs.opexperkg = opexperkg;
    bioprocessOutputs.totaCapitalInvestment = totaCapitalInvestment;
    bioprocessOutputs.capexperkg = capexperkg;
    bioprocessOutputs.plantCapacity = plantCapacity;
    bioprocessOutputs.costOfGlucoseperkg = costOfGlucoseperkg;
    bioprocessOutputs.costOfAmmoniaperkg =costOfAmmoniaperkg;
    bioprocessOutputs.costOfMediaperkg =costOfMediaperkg;
    bioprocessOutputs.costOfAerationperkg = costOfAerationperkg;
    bioprocessOutputs.costOfCoolingperkg= costOfCoolingperkg;
    bioprocessOutputs.costOfBiomassDisposalperkg =costOfBiomassDisposalperkg;
    bioprocessOutputs.costOfSterilizationperkg =costOfSterilizationperkg;
    bioprocessOutputs.costOfLaborperkg =costOfLaborperkg;
    bioprocessOutputs.otherFixedCostsperkg =otherFixedCostsperkg;
    bioprocessOutputs.dspOPEXperkg = dspOPEXperkg ;

// CAPEX Outputs

        bioprocessOutputs.MainFermAreaEquip = MainFermAreaEquip  ;
        bioprocessOutputs.MainFermAreaTIC = MainFermAreaTIC;

// Main Ferm

        bioprocessOutputs.fermenterCost =  fermenterCost;
        bioprocessOutputs.fermenterTIC = fermenterTIC;
        bioprocessOutputs.fermenterAgitatorCost = fermenterAgitatorCost;
        bioprocessOutputs.fermenterAgitatorTIC = fermenterAgitatorTIC;
        bioprocessOutputs.airBlowerCost = airBlowerCost;
        bioprocessOutputs.airBlowerTIC = airBlowerTIC;
        bioprocessOutputs.TransferPumpsCost = TransferPumpsCost;
        bioprocessOutputs.TransferPumpsTIC = TransferPumpsTIC;
        bioprocessOutputs.mainFermPiping = mainFermPiping ;
        bioprocessOutputs.mainFermEquip = mainFermEquip;
        bioprocessOutputs.mainFermTIC = mainFermTIC;

// Sugar Storage
        bioprocessOutputs.glucoseStorageTankCost = glucoseStorageTankCost;
        bioprocessOutputs.glucoseStorageTankTIC = glucoseStorageTankTIC;
        bioprocessOutputs.glucoseStorageTransferPumpsCost = glucoseStorageTransferPumpsCost;
        bioprocessOutputs.glucoseStorageTransferPumpsTIC = glucoseStorageTransferPumpsTIC;
        bioprocessOutputs.glucoseStoragepiping = glucoseStoragepiping;
        bioprocessOutputs.glucoseStorageEquip =  glucoseStorageEquip;
        bioprocessOutputs.glucoseStorageTIC = glucoseStorageTIC ;

// Titrant Storage
        bioprocessOutputs.ammoniaStorageTankCost =ammoniaStorageTankCost;
        bioprocessOutputs.ammoniaStorageTankTIC =ammoniaStorageTankTIC;
        bioprocessOutputs.acidStorageTankCost = ammoniaStorageTankCost;
        bioprocessOutputs.acidStorageTankTIC =acidStorageTankTIC ;
        bioprocessOutputs.ammoniaTransferPumpsCost  =ammoniaTransferPumpsCost;
        bioprocessOutputs.ammoniaTransferPumpsCostTIC =ammoniaTransferPumpsCostTIC;
        bioprocessOutputs.acidTransferPumpsCost = acidTransferPumpsCost ;
        bioprocessOutputs.acidTransferPumpsCostTIC  =acidTransferPumpsCostTIC ;
        bioprocessOutputs.additionPiping =additionPiping ;
        bioprocessOutputs.additionsEquip =additionsEquip;
        bioprocessOutputs.additionsTIC =additionsTIC;

//Media Prep
        bioprocessOutputs.agitatedMediaPrepTankCost =agitatedMediaPrepTankCost;
        bioprocessOutputs.agitatedMediaPrepTankTIC = agitatedMediaPrepTankTIC;
        bioprocessOutputs.mediaTransferPumpsCost = mediaTransferPumpsCost;
        bioprocessOutputs.mediaTransferPumpsCostTIC  = mediaTransferPumpsCostTIC;
        bioprocessOutputs.MediaHeatExchanger = MediaHeatExchanger;
        bioprocessOutputs.MediaWaterHeater =  MediaWaterHeater;
        bioprocessOutputs.MediaHeatExchangerTIC = MediaHeatExchangerTIC;
        bioprocessOutputs.MediaWaterHeaterTIC  = MediaWaterHeaterTIC;
        bioprocessOutputs.mediaPiping = mediaPiping;
        bioprocessOutputs.DryChemicalAdditionSkid = DryChemicalAddition;
        bioprocessOutputs.DryChemicalAdditionSkidTIC = DryChemicalAdditionTIC;
        bioprocessOutputs.mediaPrepEquip = mediaPrepEquip;
        bioprocessOutputs.mediaPrepTIC =mediaPrepTIC;

// CIP
        bioprocessOutputs.CIPTankCost = CIPTankCost;
        bioprocessOutputs.CIPTankTIC = CIPTankTIC;
        bioprocessOutputs.CIPTransferPumpsCost =CIPTransferPumpsCost;
        bioprocessOutputs.CIPTransferPumpsCostTIC  = CIPTransferPumpsCostTIC ;
        bioprocessOutputs.CIPFilterCost = CIPFilterCost;
        bioprocessOutputs.CIPFilterCostTIC = CIPFilterCostTIC;
        bioprocessOutputs.CIPHeaterCost = CIPHeaterCost;
        bioprocessOutputs.CIPHeaterCostTIC = CIPHeaterCostTIC;
        bioprocessOutputs.CIPpipingTIC = CIPpipingTIC;
        bioprocessOutputs.CIPEquip = CIPEquip;
        bioprocessOutputs.CIPTIC = CIPTIC;

//Seed
        bioprocessOutputs.seedEquipment = seedEquipment ;
        bioprocessOutputs.seedEquipmentTIC = seedEquipmentTIC;

// Primary Cell Removal
        bioprocessOutputs.CentrifugeCost = CentrifugeCost ;
        bioprocessOutputs.CentrifugeTIC = CentrifugeTIC;
        bioprocessOutputs.Centrifugepiping = Centrifugepiping;
        bioprocessOutputs.CentrifugeEquip = CentrifugeEquip;
        bioprocessOutputs.CentrifugeEquipTIC =  CentrifugeEquipTIC;
        bioprocessOutputs.brothStorageTankCost = brothStorageTankCost;
        bioprocessOutputs.brothStorageTankTIC = brothStorageTankTIC;
        bioprocessOutputs.brothStorageTransferPumpCost= brothStorageTransferPumpCost;
        bioprocessOutputs.brothStorageTransferPumpTIC= brothStorageTransferPumpTIC;
        bioprocessOutputs.brothStoragePiping = brothStoragePiping;
        bioprocessOutputs.brothStorageEquip = brothStorageEquip;
        bioprocessOutputs.brothStorageTIC =brothStorageTIC ;
        bioprocessOutputs.HeatTreatmentpackage = HeatTreatmentpackageTIC/2;
        bioprocessOutputs.HeatTreatmentpackageTIC  = HeatTreatmentpackageTIC;
        bioprocessOutputs.PrimaryCellRemovalEquip= PrimaryCellRemovalEquip;
        bioprocessOutputs.PrimaryCellRemovalTIC = PrimaryCellRemovalTIC;

// Process Utilities


        // Cooling Water
           bioprocessOutputs.coolingTowerEquip = coolingTowerEquip;
           bioprocessOutputs.coolingTowerTIC = coolingTowerTIC;
           bioprocessOutputs.coolingTowerPumps = coolingTowerPumps;
           bioprocessOutputs.coolingTowerPumpsTIC = coolingTowerPumpsTIC;
           bioprocessOutputs.coolingTowerPiping = coolingTowerPiping;
           bioprocessOutputs.coolingEquip =coolingEquip;
           bioprocessOutputs.coolingTIC = coolingTIC;
           bioprocessOutputs.BoilerPackageCosts = BoilerPackageCosts;
           bioprocessOutputs.BoilerPackageTIC = BoilerPackageTIC;
            bioprocessOutputs.AirDryer = AirDryer;
            bioprocessOutputs.AirDryingTIC = AirDryingTIC;
            bioprocessOutputs.AirReceiver = AirReceiver;
            bioprocessOutputs.AirReceiverTIC = AirReceiverTIC;
            bioprocessOutputs.AirPiping=AirPiping;
            bioprocessOutputs.AirHandlingEquip = AirHandlingEquip;
            bioprocessOutputs.AirHandlingTIC =AirHandlingTIC;
            bioprocessOutputs.MunicpalWaterTank =MunicpalWaterTank;
            bioprocessOutputs.MunicpalWaterTankTIC = MunicpalWaterTankTIC;
            bioprocessOutputs.PotableWaterTank = PotableWaterTank ;
            bioprocessOutputs.PotableWaterTankTIC  = PotableWaterTankTIC;
            bioprocessOutputs.SoftenerTank = SoftenerTank ;
            bioprocessOutputs.SoftenerTankTIC  = SoftenerTankTIC ;
            bioprocessOutputs.BrineTank = BrineTank ;
            bioprocessOutputs.BrineTankTIC  = BrineTankTIC;
            bioprocessOutputs.PotableWaterCooler = PotableWaterCooler;
            bioprocessOutputs.PotableWaterCoolerTIC  = PotableWaterCoolerTIC;
            bioprocessOutputs.MunipalWaterPump = MunipalWaterPump;
            bioprocessOutputs.MunipalWaterPumpTIC  = MunipalWaterPumpTIC;
            bioprocessOutputs.ROSystem = ROSystem;
            bioprocessOutputs.ROSystemTIC = ROSystemTIC ;
            bioprocessOutputs.WaterPiping  = WaterPiping;
            bioprocessOutputs.WaterHandlingEquip = WaterHandlingEquip;
            bioprocessOutputs.WaterHandlingTIC= WaterHandlingTIC;
            bioprocessOutputs.WasteWaterTank = WasteWaterTank;
            bioprocessOutputs.WasteWaterTankTIC = WasteWaterTankTIC;
            bioprocessOutputs.WasteWaterHeatExchanger= WasteWaterHeatExchanger;
            bioprocessOutputs.WasteWaterHeatExchangerTIC = WasteWaterHeatExchangerTIC ;
            bioprocessOutputs.WasteWaterHeater = WasteWaterHeater ;
            bioprocessOutputs.WasteWaterHeaterTIC  = WasteWaterHeaterTIC;
            bioprocessOutputs.WasteWaterHeaterPump =  WasteWaterHeaterPump ;
            bioprocessOutputs.WasteWaterHeaterPumpTIC = WasteWaterHeaterPumpTIC;
            bioprocessOutputs.WasteWaterPiping  = WasteWaterPiping;
            bioprocessOutputs.WasteWaterEquip = WasteWaterEquip;
            bioprocessOutputs.WasteWaterTIC = WasteWaterTIC;
            bioprocessOutputs.processUtilitiesEquip =processUtilitiesEquip;
            bioprocessOutputs.processUtilitiesTIC  =processUtilitiesTIC;

        bioprocessOutputs.controlSystems =controlSystems;
        bioprocessOutputs.fermtotalInstalledEquipmentCost = fermtotalInstalledEquipmentCost ;
        bioprocessOutputs.dspTIC =dspTIC;
        bioprocessOutputs.totalInstalledEquipmentCost =totalInstalledEquipmentCost;
        bioprocessOutputs.warehousing = warehousing;
        bioprocessOutputs.administrativeBuildings = administrativeBuildings ; //Office
        bioprocessOutputs.siteDevelopment = siteDevelopment;
        bioprocessOutputs.totalDirectCost = totalDirectCost;

// Indirect Costs
        bioprocessOutputs.HomeOffice = HomeOffice;
        bioprocessOutputs.prorateableExpenses = prorateableExpenses;
        bioprocessOutputs.fieldExpenses  = fieldExpenses ;
        bioprocessOutputs.projectContingency = projectContingency ;
        bioprocessOutputs.otherStartupCosts = otherStartupCosts ;
        bioprocessOutputs.totalIndirectCosts = totalIndirectCosts ;
        bioprocessOutputs.fixedCapitalInvestment = fixedCapitalInvestment;
        bioprocessOutputs.workingCapital = workingCapital;
        bioprocessOutputs.totaCapitalInvestment  = totaCapitalInvestment ;


    return bioprocessOutputs;
    }