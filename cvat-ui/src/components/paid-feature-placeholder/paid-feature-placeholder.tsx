// Copyright (C) CVAT.ai Corporation
//
// SPDX-License-Identifier: MIT

import React from 'react';
import Text from 'antd/lib/typography/Text';
import Card from 'antd/es/card/Card';
import Button from 'antd/lib/button';
import { Row, Col } from 'antd/es/grid';

import './styles.scss';
import CVATMarkdown from 'components/common/cvat-markdown';
import config from 'config';

interface Props {
    featureDescription: string;
}

function PaidFeaturePlaceholder(props: Readonly<Props>): JSX.Element | null {
    const { featureDescription } = props;

    const { PAID_PLACEHOLDER_CONFIG } = config;
    const { url } = PAID_PLACEHOLDER_CONFIG;

    return (
        <div className='cvat-paid-feature-placeholder-wrapper'>
            fix code 4160.
        </div>
    );
}

export default React.memo(PaidFeaturePlaceholder);
