import React from 'react';

// Redux
import {useAppDispatch, useAppSelector} from '../hooks/useAppDispatch';
import * as actions from '../store/actions';

// Components
import {StyleSheet, ScrollView} from 'react-native';
import ContentError from '../components/ContentError';
import Loader from '../components/Loader';
import Typography, {TypographyType} from './Typography';

// Styles
import Colors from '../constants/Colors';

// Models
import {TermType} from '../store/types/Term.model';

type TermDetailsTablet = {
  termId?: string;
  type: TermType;
};

const TermDetailsTablet: React.VFC<TermDetailsTablet> = ({termId, type}) => {
  const dispatch = useAppDispatch();

  const term = useAppSelector(state => state.terms.termDetails);
  const loading = useAppSelector(state => state.terms.isTermDetailsLoading);
  const error = useAppSelector(state => state.terms.termDetailsError);

  React.useEffect(() => {
    if (termId) {
      dispatch(actions.getTermDetails.request({termId, type}));
    }
  }, [dispatch, termId, type]);

  if (!termId) {
    return null;
  }

  if (loading) {
    return <Loader isAbsolute />;
  }

  if (error) {
    return (
      <ContentError
        onPressRefresh={() =>
          !!termId && dispatch(actions.getTermDetails.request({termId, type}))
        }
      />
    );
  }

  return (
    <ScrollView
      bounces={false}
      style={styles.container}
      contentContainerStyle={styles.content}>
      <Typography type={TypographyType.Title} resizeable>
        {term?.term}
      </Typography>
      <Typography
        type={TypographyType.Text}
        style={styles.description}
        resizeable>
        {term?.description}
      </Typography>
    </ScrollView>
  );
};

export default TermDetailsTablet;

const styles = StyleSheet.create({
  container: {
    borderLeftWidth: 1,
    borderLeftColor: Colors.primary,
    paddingLeft: 20,
    flexGrow: 0,
  },
  content: {
    paddingVertical: 15,
  },
  description: {
    marginTop: 30,
  },
});
