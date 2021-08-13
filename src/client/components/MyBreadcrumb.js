import React from 'react';
import { Link } from 'react-router-dom'
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

//TODO - replace generic breadcrumb with specific instance - e.g. "Budget Details" becomes "05/21" in the breadcrumb trail.

const MyBreadcrumb = ({ crumbs }) => {
    console.log("crumbs: ", crumbs.length);
    if (crumbs.length <= 1) {
        return null;
    }

    return (
        <div>
            <Breadcrumbs aria-label="breadcrumb">
                {crumbs.map(({ name, path }, key) =>
                    key + 1 === crumbs.length ?
                        (<span key={key}>{name}</span>)
                        :
                        (<Link key={key} to={path}>{name}</Link>)
                )}
            </Breadcrumbs>
        </div>
    );
};

export default MyBreadcrumb;