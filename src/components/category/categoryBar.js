import React, { useState, useEffect } from 'react'
import { Grid, Segment } from 'semantic-ui-react';
import './categoryBar.css';
import { Form, Select } from 'semantic-ui-react';
import Skeleton from '@material-ui/lab/Skeleton';

const CategoryBar = (props) => {
    let isLoading = props.isLoading;

    const [isFetching, setIsFetching] = useState(false);
    const [channelOptions, setChannelOptions] = useState([]);
    const [marketPlaceOptions, setMarketPlaceOptions] = useState([]);
    const [marketPlaceValue, setMarketPlaceValue] = useState('');
    const [retailWeekOptions, setRetailWeekOptions] = useState([]);
    const [retailWeekValue, setRetailWeekValue] = useState('');
    const [channelValue, setChannelValue] = useState('');
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [categoryValue, setCategoryValue] = useState([]);
    const [genderOptions, setGenderOptions] = useState([]);
    const [genderValue, setGenderValue] = useState('');
    const [divisionOptions, setDivisionOptions] = useState([]);
    const [divisionValue, setDivisionValue] = useState('');
    const [tableOptions, setTableOptions] = useState([]);
    const [tableValue, setTableValue] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        /* To initialise marketplace options */
        let marketPlaceOptions = [];
        if (isLoading) {
            props.auth.userAccessDetails.map(eachitem => marketPlaceOptions.push({
                key: eachitem.marketplaceDescription,
                value: eachitem.marketplaceDescription,
                text: eachitem.marketplaceDescription
            }));
        }
        setMarketPlaceOptions(marketPlaceOptions);

        /* To initialise retailweek options */
        let retailWeekOptions = [];
        if (isLoading) {
            props.data.selectionFilters.retailWeek.map(eachitem => retailWeekOptions.push({
                key: eachitem.weekDescription,
                value: eachitem.weekDescription,
                text: eachitem.weekDescription
            }));
        }
        setRetailWeekOptions(retailWeekOptions);

        /* To initialise catergory options */
        let categoryOptions = [];
        if (isLoading) {
            props.data.selectionFilters.category.map(eachitem => categoryOptions.push({
                key: eachitem.categoryDescription,
                value: eachitem.categoryDescription,
                text: eachitem.categoryDescription
            }));
        }
        setCategoryOptions(categoryOptions);

        /* To initialise gender options */
        let genderOptions = [];
        if (isLoading) {
            props.data.selectionFilters.gender.map(eachitem => genderOptions.push({
                key: eachitem.genderDescription,
                value: eachitem.genderDescription,
                text: eachitem.genderDescription
            }));
        }
        setGenderOptions(genderOptions);

        /* To initialise division options */
        let divisionOptions = [];
        if (isLoading) {
            props.data.selectionFilters.division.map(eachitem => divisionOptions.push({
                key: eachitem.divisionDescription,
                value: eachitem.divisionDescription,
                text: eachitem.divisionDescription
            }));
        }
        setDivisionOptions(divisionOptions);

        /* To initialise table options */
        let tableOptions = [];
        if (isLoading) {
            props.data.selectionFilters.table.map(eachitem => tableOptions.push({
                key: eachitem.tableDescription,
                value: eachitem.tableDescription,
                text: eachitem.tableDescription
            }));
        }
        setTableOptions(tableOptions);
    }, [isLoading, props]);

    /* To handle marketplace change */
    const handleMarketPlaceChange = (e, { value }) => {
        setMarketPlaceValue(value);
        setIsFetching(true);
        props.auth.userAccessDetails.map(eachitem => {
            if (eachitem.marketplaceDescription === value) {
                let tempChannel = [];
                eachitem.channels.map(eachChannel => {
                    tempChannel.push({
                        key: eachChannel.channelDescription,
                        value: eachChannel.channelDescription,
                        text: eachChannel.channelDescription
                    });
                    setChannelOptions(tempChannel);
                    setIsFetching(false);
                });
            } else {
                return;
            }
        });
    };

    /* To handle retail week change */
    const handleRetailWeekChange = (e, { value }) => {
        setRetailWeekValue(value);
    };

    /* To handle channel change */
    const handleChannelChange = (e, { value }) => {
        setChannelValue(value);
    };

    /* To handle category change */
    const handleCategoryChange = (e, { value }) => {
        setCategoryValue(value);
    };

    /* To handle gender change */
    const handleGenderChange = (e, { value }) => {
        setGenderValue(value);
    };

    /* To handle division change */
    const handleDivisionChange = (e, { value }) => {
        setDivisionValue(value);
    };

    /* To handle table change */
    const handleTableChange = (e, { value }) => {
        setTableValue(value);
        setIsDisabled(false);
    };

    /* Handle Load/submit button */
    const handleSubmit = () => {
        const formDataUpdated = {
            marketPlace: marketPlaceValue,
            retailWeek: retailWeekValue,
            channel: channelValue,
            category: categoryValue,
            gender: genderValue,
            division: divisionValue,
            action: tableValue
        };
        props.onCatergorySubmit(formDataUpdated);
        //console.log('formed request data - ', formDataUpdated);
    }

    return (<>
        <Form onSubmit={handleSubmit}>
            <Form.Group widths='equal'>
                <Grid columns='equal' className="center">
                    <Grid.Column width={2}>
                        <Segment>
                            {isLoading ? <Form.Field
                                control={Select}
                                options={marketPlaceOptions}
                                placeholder='Marketplace'
                                search
                                searchInput={{ id: 'form-select-control-marketplace' }}
                                onChange={handleMarketPlaceChange}
                            /> : <Skeleton variant="rect" width={130} height={40} />}
                            <h1>MARKETPLACE</h1>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Segment>
                            {isLoading ? <Form.Field
                                control={Select}
                                options={retailWeekOptions}
                                placeholder='Week'
                                clearable
                                search
                                searchInput={{ id: 'form-select-control-week' }}
                                onChange={handleRetailWeekChange}
                            /> : <Skeleton variant="rect" width={130} height={40} />}
                            <h1>RETAIL WEEK</h1>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Segment>
                            {isLoading ? <Form.Field
                                control={Select}
                                options={channelOptions}
                                placeholder='Channel'
                                clearable
                                loading={isFetching}
                                search
                                searchInput={{ id: 'form-select-control-channel' }}
                                onChange={handleChannelChange}
                            /> : <Skeleton variant="rect" width={130} height={40} />}
                            <h1>CHANNEL</h1>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Segment>
                            <Grid columns='equal' >
                                <Grid.Column width={5}>
                                    {isLoading ? <Form.Field
                                        control={Select}
                                        options={divisionOptions}
                                        placeholder='Division'
                                        clearable
                                        search
                                        searchInput={{ id: 'form-select-control-division' }}
                                        onChange={handleDivisionChange}
                                    /> : <Skeleton variant="rect" width={130} height={40} />}
                                </Grid.Column>
                                <Grid.Column width={5}>
                                    {isLoading ? <Form.Field
                                        control={Select}
                                        options={genderOptions}
                                        placeholder='Gender'
                                        clearable
                                        search
                                        searchInput={{ id: 'form-select-control-gender' }}
                                        onChange={handleGenderChange}
                                    /> : <Skeleton variant="rect" width={130} height={40} />}
                                </Grid.Column>
                                <Grid.Column>
                                    {isLoading ? <Form.Field
                                        control={Select}
                                        options={categoryOptions}
                                        placeholder='Category'
                                        clearable
                                        multiple
                                        fluid
                                        selection
                                        searchInput={{ id: 'form-select-control-category' }}
                                        onChange={handleCategoryChange}
                                    /> : <Skeleton variant="rect" width={130} height={40} />}
                                </Grid.Column>
                            </Grid>
                            <h1>MERCHANDISE HIERARCHY</h1>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Segment>
                            {isLoading ? <Form.Field
                                control={Select}
                                options={tableOptions}
                                placeholder='Action'
                                clearable
                                search
                                searchInput={{ id: 'form-select-control-action' }}
                                onChange={handleTableChange}
                            /> : <Skeleton variant="rect" width={130} height={40} />}
                            <h1>TABLE</h1>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={2}>
                        <Form.Button fluid primary disabled={isDisabled}>LOAD</Form.Button>
                        <Form.Button fluid primary disabled={true}>SAVE</Form.Button>
                        {/* <Button>Save</Button> */}
                    </Grid.Column>
                </Grid>
            </Form.Group>
        </Form>
    </>);
}

export default CategoryBar;