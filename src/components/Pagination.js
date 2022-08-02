import React, { memo } from 'react';
import { Pagination, PaginationItem } from '@mui/material';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import makeStyles from './styles';

const paginateStyles = makeStyles();

const Paginate = ({ page, search, tags }) => {
  const totalPage = useSelector((state) => state.posts.totalPage);

  console.log("Pagination is Rendered");
  console.log("Pagination Total Page: ", totalPage);

  const searchQuery = (search || tags) ? `&search=${search || ''}&tags=${tags || ''}` : '';

  return (
    <Pagination
      sx={paginateStyles.ui}
      count={totalPage || 1}
      page={Number(page) || 1}
      showFirstButton showLastButton
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}${searchQuery}`} />
      )}
    />
  )
};

export default memo(Paginate);