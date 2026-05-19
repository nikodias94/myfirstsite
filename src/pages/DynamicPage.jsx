import React, { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useContent } from '../context/ContentContext';
import { FileText, PenLine } from 'lucide-react';
import ContentModal from '../components/ContentModal';
import useAutoOpenItem from '../hooks/useAutoOpenItem';
import PoemCard from '../components/PoemCard';
import PageHero from '../components/PageHero';
import useSEO from '../hooks/useSEO';

const DynamicPage = () => {
    const { section } = useParams();
    const { content } = useContent();
    const [selectedItem, setSelectedItem] = useState(null);

    // Find the navigation item for this section to get the title
    const sectionPath = `/${section}`;
    const navItem = content.navigation.find(n => n.path === sectionPath);
    const pageTitle = navItem?.title || section;
    const items = content.dynamicContent?.[sectionPath] || [];

    useSEO({ title: pageTitle, path: sectionPath });

    const openItem = useCallback((item) => setSelectedItem(item), []);
    useAutoOpenItem(items, openItem);

    // If no nav item exists for this path, this is a 404
    if (!navItem) {
        return null; // App.jsx will catch this with NotFound
    }

    return (
        <>
            <PageHero
                variant="default"
                icon={FileText}
                title={pageTitle}
                subtitle={navItem?.subtitle || ''}
            />

            <div className="container section-sm" style={{ paddingTop: 0 }}>
                {items.length > 0 ? (
                    <div className="grid-poems">
                        {items.map((item, index) => (
                            <PoemCard
                                key={item.id}
                                item={item}
                                index={index}
                                onOpenModal={() => setSelectedItem(item)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon"><PenLine size={48} /></div>
                        <h3 className="empty-state-title">ჩანაწერები ჯერ არ არის დამატებული</h3>
                        <p className="empty-state-text">მალე აქ გამოჩნდება ახალი ჩანაწერები. დაბრუნდით მოგვიანებით!</p>
                    </div>
                )}

                <ContentModal
                    isOpen={!!selectedItem}
                    onClose={() => setSelectedItem(null)}
                    id={selectedItem?.id}
                    title={selectedItem?.title}
                    content={selectedItem?.content}
                    date={selectedItem?.date}
                />
            </div>
        </>
    );
};

export default DynamicPage;
