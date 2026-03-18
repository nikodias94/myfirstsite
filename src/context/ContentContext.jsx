import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabase';
import { defaultContent } from '../data/defaultContent';

const ContentContext = createContext();

export const useContent = () => useContext(ContentContext);

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState({ ...defaultContent, navigation: [], socialLinks: [] });
  const [loading, setLoading] = useState(true);

  // Fetch all data on mount
  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [poemsRes, poemsEnRes, translationsRes, reviewsRes, proseRes, homepageSettingsRes, navigationRes, socialLinksRes] = await Promise.all([
          supabase.from('poems').select('*').order('created_at', { ascending: false }),
          supabase.from('poems_en').select('*').order('created_at', { ascending: false }),
          supabase.from('translations').select('*').order('created_at', { ascending: false }),
          supabase.from('reviews').select('*').order('created_at', { ascending: false }),
          supabase.from('prose').select('*').order('created_at', { ascending: false }),
          supabase.from('homepage_settings').select('*').eq('id', 1).single(),
          supabase.from('navigation_menu').select('*').order('order_index', { ascending: true }),
          supabase.from('social_links').select('*').order('created_at', { ascending: true })
        ]);

        setContent(prev => {
          const newAbout = homepageSettingsRes.data ? {
            name: homepageSettingsRes.data.name || '',
            bio: homepageSettingsRes.data.bio || '',
            quote: homepageSettingsRes.data.quote || '',
            heroImage: homepageSettingsRes.data.hero_image_url || '',
            aboutTitle: homepageSettingsRes.data.about_title || '',
            aboutDescription: homepageSettingsRes.data.about_description || '',
            aboutImage: homepageSettingsRes.data.about_image_url || '',
            aboutBio: homepageSettingsRes.data.about_bio || '',
            aboutQuote: homepageSettingsRes.data.about_quote || '',
            contactEmail: homepageSettingsRes.data.contact_email || '',
            contactPhone: homepageSettingsRes.data.contact_phone || '',
            contactAddress: homepageSettingsRes.data.contact_address || '',
            contactText: homepageSettingsRes.data.contact_text || '',
            typingWords: homepageSettingsRes.data.typing_words || 'პოეტი,პროზაიკოსი,მთარგმნელი,შემოქმედი',
            footerText: homepageSettingsRes.data.footer_text || 'Created with ❤️ & React',
          } : (prev.about || {});

          return {
            ...prev,
            poems: poemsRes.data || [],
            poemsEn: poemsEnRes.data || [],
            translations: translationsRes.data || [],
            reviews: reviewsRes.data || [],
            prose: proseRes.data || [],
            navigation: navigationRes.data || [],
            socialLinks: socialLinksRes.data || [],
            about: newAbout
          };
        });
      } catch (error) {
        console.error("Error fetching content from Supabase:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Map category to db table name
  const getTableName = (category) => {
    if (category === 'poemsEn') return 'poems_en';
    if (category === 'navigation') return 'navigation_menu';
    if (category === 'socialLinks') return 'social_links';
    return category;
  };

  // Actions
  const addItem = async (category, item) => {
    const table = getTableName(category);
    
    let newItem;
    if (category === 'navigation') {
        newItem = {
            title: item.title,
            path: item.path,
            order_index: parseInt(item.order_index, 10) || 0
        };
    } else if (category === 'socialLinks') {
        newItem = {
            platform_name: item.platform_name,
            url: item.url,
            icon_name: item.icon_name
        };
    } else {
        // Default date if none provided for other content types
        newItem = {
          title: item.title,
          content: item.content,
          date: item.date || new Date().toISOString().split('T')[0]
        };
    }

    const { data, error } = await supabase.from(table).insert([newItem]).select();
    
    if (error) {
      console.error(`Error adding to ${table}:`, error);
      return false;
    }

    if (data && data.length > 0) {
      setContent(prev => ({
        ...prev,
        [category]: [data[0], ...prev[category]]
      }));
    }
    return true;
  };

  const updateItem = async (category, id, updatedItem) => {
    const table = getTableName(category);
    
    let updateData;
    if (category === 'navigation') {
        updateData = {
            title: updatedItem.title,
            path: updatedItem.path,
            order_index: parseInt(updatedItem.order_index, 10) || 0
        };
    } else if (category === 'socialLinks') {
        updateData = {
            platform_name: updatedItem.platform_name,
            url: updatedItem.url,
            icon_name: updatedItem.icon_name
        };
    } else {
        updateData = {
          title: updatedItem.title,
          content: updatedItem.content,
          date: updatedItem.date
        };
    }

    const { data, error } = await supabase.from(table).update(updateData).eq('id', id).select();

    if (error) {
      console.error(`Error updating in ${table}:`, error);
      return false;
    }

    if (data && data.length > 0) {
      setContent(prev => ({
        ...prev,
        [category]: prev[category].map(item => item.id === id ? { ...item, ...data[0] } : item)
      }));
    }
    return true;
  };

  const deleteItem = async (category, id) => {
    const table = getTableName(category);
    
    const { error } = await supabase.from(table).delete().eq('id', id);

    if (error) {
      console.error(`Error deleting from ${table}:`, error);
      return false;
    }

    setContent(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== id)
    }));
    return true;
  };

  const updateHomepageSettings = async (settings) => {
    const { data, error } = await supabase
      .from('homepage_settings')
      .update({
        name: settings.name,
        bio: settings.bio,
        quote: settings.quote,
        hero_image_url: settings.heroImage,
        about_title: settings.aboutTitle,
        about_description: settings.aboutDescription,
        about_image_url: settings.aboutImage,
        about_bio: settings.aboutBio,
        about_quote: settings.aboutQuote,
        contact_email: settings.contactEmail,
        contact_phone: settings.contactPhone,
        contact_address: settings.contactAddress,
        contact_text: settings.contactText,
        typing_words: settings.typingWords,
        footer_text: settings.footerText
      })
      .eq('id', 1)
      .select();

    if (error) {
      console.error('Error updating homepage settings:', error);
      return false;
    }

    if (data && data.length > 0) {
      setContent(prev => ({
        ...prev,
        about: {
          name: data[0].name,
          bio: data[0].bio,
          quote: data[0].quote,
          heroImage: data[0].hero_image_url || '',
          aboutTitle: data[0].about_title || '',
          aboutDescription: data[0].about_description || '',
          aboutImage: data[0].about_image_url || '',
          aboutBio: data[0].about_bio || '',
          aboutQuote: data[0].about_quote || '',
          contactEmail: data[0].contact_email || '',
          contactPhone: data[0].contact_phone || '',
          contactAddress: data[0].contact_address || '',
          contactText: data[0].contact_text || '',
          typingWords: data[0].typing_words || 'პოეტი,პროზაიკოსი,მთარგმნელი,შემოქმედი',
          footerText: data[0].footer_text || 'Created with ❤️ & React',
        }
      }));
    }
    return true;
  };

  const importData = async (jsonData) => {
    // Import functionality is trickier with relational DBs, 
    // for now we'll keep the UI but disable or simulate it.
    alert("Importing directly from JSON to DB is not fully supported yet.");
    return false;
  };

  const resetToDefault = () => {
    alert("Reset to default is disabled while connected to Supabase.");
  };

  return (
    <ContentContext.Provider value={{ content, loading, addItem, updateItem, deleteItem, updateHomepageSettings, importData, resetToDefault }}>
      {children}
    </ContentContext.Provider>
  );
};
