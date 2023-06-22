import { useState } from 'react';
import { AttractionFormType } from '../../types';

const useAttractionForm = () => {
  const [attractionForm, setAttractionForm] = useState<AttractionFormType>({
    attractionId: undefined,
    attraction: '',
  });
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  return { setAttractionForm, setIsOpenDialog, isOpenDialog, attractionForm };
};

export default useAttractionForm;
