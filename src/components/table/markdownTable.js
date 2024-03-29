import React from 'react';
import { AgGridReact, AgGridColumn } from '@ag-grid-community/react';
import { RowDetailsContext, SaveBtnContext, SelectedChannelContext } from '../context/rowDetailsContext';
import { AllModules } from "@ag-grid-enterprise/all-modules";
import CustomTooltip from './customTooltip.jsx';

const MarkdownTable = (props) => {
    let consolidatedRows = [];
    const { setRowDetailValue } = React.useContext(RowDetailsContext);
    const { setSaveBtnDisable } = React.useContext(SaveBtnContext);
    const { selectedChannel } = React.useContext(SelectedChannelContext);

    const onCellValueChanged = (params) => {
        if (!(params.oldValue === null && params.newValue === undefined)) {
            params.node.data['changed'] = true;
            consolidatedRows.push(params.data);
            setRowDetailValue(consolidatedRows);
            setSaveBtnDisable(false);
        }
    }

    function numberParser(params) {
        if (params.value === null || params.value === 0 || params.value === undefined) {
            return '-'
        }
    }

    return (
        <div className="ag-theme-alpine" style={{ height: '70vh' }}>
            <AgGridReact
                modules={AllModules}
                defaultColDef={{
                    flex: 1,
                    minWidth: 175,
                    sortable: true,
                    resizable: true,
                    filter: true,
                    enableRowGroup: true,
                    enablePivot: true,
                    tooltipComponent: 'customTooltip',
                    valueFormatter: numberParser
                }}
                sideBar={{
                    toolPanels: [
                        {
                            id: 'columns',
                            labelDefault: 'Columns',
                            labelKey: 'columns',
                            iconKey: 'columns',
                            toolPanel: 'agColumnsToolPanel',
                            toolPanelParams: {
                                suppressRowGroups: true,
                                suppressValues: true,
                                suppressPivots: true,
                                suppressPivotMode: true,
                                suppressSideButtons: true
                            },
                        }]
                }}
                onGridReady={props.onGridReady}
                rowData={props.rowData}
                pagination={true}
                enableCellTextSelection={true}
                suppressDragLeaveHidesColumns={true}
                tooltipShowDelay={0}
                frameworkComponents={{ customTooltip: CustomTooltip }}
            >

                <AgGridColumn headerName="Product">
                    <AgGridColumn field="StyleColor" pinned="left" lockPinned={true} cellClass="lock-pinned" cellRenderer={function (params) {
                        if (params.value !== undefined) {
                            return "<a target='_blank' href='http://images6.nike.com/is/image/DPILS/"
                                + params.value
                                + "-PV'>" + params.value + "</a>";
                        } else {
                            return null
                        }
                    }} />
                    <AgGridColumn field="Comment"
                        editable={true}
                        cellEditor="agLargeTextCellEditor"
                        onCellValueChanged={onCellValueChanged} />
                    <AgGridColumn field="Description" />
                    <AgGridColumn field="SlimLifecycleSeason" />
                </AgGridColumn>

                <AgGridColumn headerName="Product Attribution">
                    <AgGridColumn field="CGD" />
                </AgGridColumn>

                <AgGridColumn headerName="Recommendation" headerClass='custom-font-color' >
                    <AgGridColumn field="RecommendedAction" headerClass='custom-font-color' headerName="Action" width='200' tooltipField="RecommendedAction" tooltipComponent="customTooltip"
                        tooltipComponentParams={{ color: '#ececec' }} />
                    <AgGridColumn field="SelectedRecommendedActionOverride" headerClass='custom-font-color' headerName="Action Override"
                        width='225'
                        editable={true}
                        cellEditor="agSelectCellEditor"
                        cellEditorParams={function (params) {
                            let givenValue = params.data.RecommendedActionOverride;
                            if (givenValue != null) {
                                let actionOveride = givenValue.split(',');
                                actionOveride.push(null);
                                return {
                                    values: actionOveride
                                }
                            } else {
                                return {
                                    values: []
                                }
                            }
                        }}
                        onCellValueChanged={onCellValueChanged}
                    />
                </AgGridColumn>

                <AgGridColumn headerName="Inventory">
                    <AgGridColumn field="Contracts" />
                    <AgGridColumn field="unassignedZerotoThirtyDaysOut" headerName='Unassigned Qty 0_30' />
                    <AgGridColumn field="UnassignedThirtyonetoSixtyDaysOut" headerName='Unassigned Qty 31_60' />
                    <AgGridColumn field="UnassignedSixtyonePlusDaysOut" headerName='Unassigned Qty 61 Plus' />
                    <AgGridColumn field="1083_Contracts" headerName='1083 Contracts' />
                    <AgGridColumn field="1084_Contracts" headerName='1084 Contracts' />
                    <AgGridColumn field="1085_Contracts" headerName='1085 Contracts' />
                    {selectedChannel === 'NDDC' ? <AgGridColumn field="NSO_Contracts" /> : selectedChannel === 'NSO' ? <AgGridColumn field="NDDC_Contracts" /> : <AgGridColumn hide={true} />}
                    <AgGridColumn field="WholesaleContract" />
                    <AgGridColumn field="StoreIOH" />
                    <AgGridColumn field="InTransit" />
                    <AgGridColumn field="OnOrder" />
                    <AgGridColumn field="GA_1083" headerName="GA 1083" />
                    <AgGridColumn field="GA_1084" headerName="GA 1084" />
                    <AgGridColumn field="GA_1085" headerName="GA 1085" />
                    <AgGridColumn field="SizeCountOwned" />
                    <AgGridColumn field="SizeCountTotal" />
                    <AgGridColumn field="SizeIntegrity" />
                    <AgGridColumn field="ChannelWOS" />
                    <AgGridColumn field="MarketPlaceWOS" />
                    <AgGridColumn field="RecommendedChaseUnits" />
                    <AgGridColumn field="RecommendedCancelUnits" />
                </AgGridColumn>

                <AgGridColumn headerName="Sales">
                    <AgGridColumn field="NetUnitsLastWeek" />
                    <AgGridColumn field="NetUnitsFourWkAvg" headerName="Net Units 4W Avg" />
                    <AgGridColumn field="NetUnitsFourWkRolling" headerName="Net Units 4W rolling" />
                    <AgGridColumn field="NetUnitsMTD" />
                    <AgGridColumn field="NetUnitsSTD" />
                    <AgGridColumn field="NetSalesLW" />
                    <AgGridColumn field="NetSalesFourWkAvg" headerName="Net Sales 4w avg" />
                    <AgGridColumn field="NetSalesFourWkRolling" headerName="Net Sales 4w rolling" />
                    <AgGridColumn field="NetSalesMTD" />
                    <AgGridColumn field="NetSalesSTD" />
                    <AgGridColumn field="NetAURLW" headerName="Net AUR LW" />
                    <AgGridColumn field="NetAURFourWeekAvg" headerName="Net AUR 4W Avg" />
                    <AgGridColumn field="NetSalesLWUSD" />
                    <AgGridColumn field="NetSalesFourWeekRollingUSD" headerName="Net Sales 4w rolling USD" />
                    <AgGridColumn field="NetSalesFourWeekAvgUSD" headerName="Net Sales 4W Avg USD" />
                    <AgGridColumn field="NetSalesMTDUSD" />
                    <AgGridColumn field="NetSalesSTDUSD" />
                    <AgGridColumn field="NetAURLWUSD" headerName="Net AUR LW USD" />
                    <AgGridColumn field="NetAURFourWeekAvgUSD" headerName="Net AUR 4W Avg USD" />
                    <AgGridColumn field="DemandUnitsLW" />
                    <AgGridColumn field="DemandUnitsFourWeekRolling" headerName="Demand Units 4W rolling" />
                    <AgGridColumn field="DemandUnitsFourWeekAvg" headerName="Demand Units 4W avg" />
                    <AgGridColumn field="DemandUnitsMTD" />
                    <AgGridColumn field="DemandUnitsSTD" />
                    <AgGridColumn field="DemandSalesLW" />
                    <AgGridColumn field="DemandSalesFourWeekRolling" headerName="Demand Sales 4W rolling" />
                    <AgGridColumn field="DemandSalesFourWeekAvg" headerName="Demand Sales 4W avg" />
                    <AgGridColumn field="DemandSalesMTD" />
                    <AgGridColumn field="DemandSalesSTD" />
                    <AgGridColumn field="DemandAURLW" headerName="Demand AUR LW" />
                    <AgGridColumn field="DemandAURFourWeekAvg" headerName="Demand AUR 4W avg" />
                    <AgGridColumn field="DemandSalesLWUSD" />
                    <AgGridColumn field="DemandSalesFourWeekRollingUSD" headerName="Demand Sales 4W rolling USD" />
                    <AgGridColumn field="DemandSalesFourWeekAvgUSD" headerName="Demand Sales 4W Avg USD" />
                    <AgGridColumn field="DemandSalesMTDUSD" />
                    <AgGridColumn field="DemandSalesSTDUSD" />
                    <AgGridColumn field="DemandAURLWUSD" headerName="Demand AUR LW USD" />
                    <AgGridColumn field="DemandAURFourWeekAvgUSD" headerName="Demand AUR 4W avg USD" />
                    <AgGridColumn field="FirstOrderDate" />
                    <AgGridColumn field="DaysOnSale" />
                </AgGridColumn>

                <AgGridColumn headerName="Price">
                    <AgGridColumn field="MSRP" />
                    <AgGridColumn field="WholesalePriceLocal" />
                    <AgGridColumn field="CurrentSellingPrice" />
                    <AgGridColumn field="TotalDiscount" />
                    <AgGridColumn field="LastMDDate" />
                    <AgGridColumn field="MDCount" />
                    <AgGridColumn field="ContributionMargin" />
                    <AgGridColumn field="PriceElasticitySC" />

                    <AgGridColumn field="PriceElasticityConfidence" />
                    <AgGridColumn field="RecommendedMarkPCTElasticity" />
                    <AgGridColumn field="RecommendedMarkPRCElasticity" />
                    <AgGridColumn field="TotalDiscountAfterMarkElasticity" />
                    <AgGridColumn field="RecommendedMarkPCTInterval" />
                    <AgGridColumn field="RecommendedMarkPRCInterval" />
                    <AgGridColumn field="TotalDiscountAfterMarkInterval" />
                </AgGridColumn>
            </AgGridReact>
        </div>
    );
}

export default MarkdownTable;